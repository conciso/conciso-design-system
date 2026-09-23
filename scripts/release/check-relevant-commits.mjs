#!/usr/bin/env node
// commitlint hart, aber nur für veröffentlichungsrelevante Commits (ADR-0008 Regel 5).
// Läuft im PR-Job „Commitlint“ über jeden Commit des PRs (Basis..HEAD): nicht-relevante
// Commits (Storybook, Beispielseiten, Doku, CI) werden nicht einmal geprüft, auch wenn sie
// keine Conventional Commits sind. Schreibt zusätzlich die Job-Summary (Spec Regel 10):
// ob und welches Release der PR auslösen würde, plus die Liste der relevanten Commits.
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import lint from '@commitlint/lint';
import load from '@commitlint/load';
import { filterRelevantCommits } from './filter-commits.mjs';
import { enrichCommit } from './git-commit-files.mjs';
import { computeBump, nextVersion } from './compute-bump.mjs';

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function latestReleaseTag() {
  const tags = git(['tag', '--list', 'v*', '--sort=-v:refname']);
  const [latest] = tags.split('\n').filter(Boolean);
  return latest ?? null;
}

function getCommits(range) {
  const hashes = git(['rev-list', range]).split('\n').filter(Boolean).reverse();
  return hashes.map((hash) => {
    const subject = git(['log', '-1', '--format=%s', hash]);
    const body = git(['log', '-1', '--format=%b', hash]);
    return { hash, subject, body, message: [subject, body].filter(Boolean).join('\n\n'), ...enrichCommit(hash) };
  });
}

async function lintCommit(message, config) {
  return lint(message, config.rules, {
    parserOpts: config.parserPreset?.parserOpts,
    plugins: config.plugins,
    ignores: config.ignores,
    defaultIgnores: config.defaultIgnores,
  });
}

function buildSummary(bump, version, relevant) {
  const lines = [];
  lines.push(
    bump
      ? `Dieser PR löst Release **${version}** (${bump}) aus.`
      : 'Kein Release.',
  );
  lines.push('', '### Veröffentlichungsrelevante Commits', '');
  if (relevant.length === 0) {
    lines.push('_Keine._');
  } else {
    for (const commit of relevant) {
      lines.push(`- \`${commit.hash.slice(0, 7)}\` ${commit.subject}`);
    }
  }
  return lines.join('\n');
}

async function main() {
  const range = process.argv[2];
  if (!range) {
    console.error('Aufruf: node scripts/release/check-relevant-commits.mjs <basis>..<kopf>');
    process.exit(1);
  }

  const commits = getCommits(range);
  const relevant = filterRelevantCommits(commits);
  const config = await load({}, { file: 'commitlint.config.mjs' });

  let failed = false;
  for (const commit of relevant) {
    const result = await lintCommit(commit.message, config);
    if (result.valid) {
      console.log(`✓ ${commit.hash.slice(0, 7)} ${commit.subject}`);
    } else {
      failed = true;
      console.error(`✖ ${commit.hash.slice(0, 7)} ${commit.subject}`);
      for (const problem of result.errors) console.error(`  ${problem.message}`);
    }
  }
  if (relevant.length === 0) {
    console.log('Keine veröffentlichungsrelevanten Commits in diesem PR — nichts zu prüfen.');
  }

  const bump = computeBump(relevant);
  const lastTag = latestReleaseTag();
  const lastVersion = lastTag ? lastTag.replace(/^v/, '') : '0.0.0';
  const version = bump ? nextVersion(lastVersion, bump) : null;

  const summary = buildSummary(bump, version, relevant);
  console.log(`\n${summary}`);
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (summaryPath) appendFileSync(summaryPath, `${summary}\n`);

  if (failed) {
    console.error('\ncommitlint fehlgeschlagen für mindestens einen relevanten Commit.');
    process.exit(1);
  }
}

main();
