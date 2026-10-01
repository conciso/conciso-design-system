#!/usr/bin/env node
// commitlint hart, aber nur für veröffentlichungsrelevante Commits (ADR-0010 Regel 5).
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

// Letzter Release-Tag, der vom PR-Kopf aus erreichbar ist — derselbe, ab dem die Engine nach
// dem Merge rechnet (nicht einfach der höchste Tag im Repo).
function latestReleaseTag(head) {
  try {
    return git(['describe', '--tags', '--abbrev=0', '--match', 'v[0-9]*', head]);
  } catch {
    return null;
  }
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

function buildSummary({ bump, releaseBump, version, lastTag, relevant }) {
  const lines = [];
  if (!bump) {
    lines.push('Kein Release.');
  } else {
    lines.push(`Dieser PR löst ein Release aus (eigene Commits: ${bump}).`);
    lines.push(
      '',
      `Nach dem Merge entsteht **${version}** (${releaseBump}) — gerechnet ab ${lastTag ?? 'dem ersten Commit'}, ` +
        'zusammen mit den noch nicht veröffentlichten Commits auf der Basis.',
    );
  }
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

  // Derselbe commit-analyzer wie in der Engine (siehe compute-bump.mjs); `relevant` ist
  // chronologisch, so wie computeBump es erwartet.
  const bump = await computeBump(relevant);

  // Die Zielversion NICHT aus den PR-Commits allein: liegen auf der Basis schon relevante
  // Commits ohne Tag (etwa während ihr Publish-Lauf noch läuft), rechnet die Engine nach dem
  // Merge ab dem letzten Tag über alle zusammen. Dasselbe hier — ob der PR überhaupt ein
  // Release auslöst, entscheiden aber weiterhin nur seine eigenen Commits.
  const head = range.split('..').pop() || 'HEAD';
  const lastTag = latestReleaseTag(head);
  const lastVersion = lastTag ? lastTag.replace(/^v/, '') : '0.0.0';
  const releaseBump = bump
    ? await computeBump(filterRelevantCommits(getCommits(lastTag ? `${lastTag}..${head}` : head)))
    : null;
  const version = releaseBump ? nextVersion(lastVersion, releaseBump) : null;

  const summary = buildSummary({ bump, releaseBump, version, lastTag, relevant });
  console.log(`\n${summary}`);
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (summaryPath) appendFileSync(summaryPath, `${summary}\n`);

  if (failed) {
    console.error('\ncommitlint fehlgeschlagen für mindestens einen relevanten Commit.');
    process.exit(1);
  }
}

main();
