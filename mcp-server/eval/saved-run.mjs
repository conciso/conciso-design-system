import { checkAnswer, checkCoreClaim, mentionsGlobalCssInclusion } from './checker.mjs';

export const SAVED_RUN_SCHEMA_VERSION = 1;

export function serializeTruthMap(truthMap) {
  function serializeSelectors(selectors) {
    return Object.fromEntries(
      [...selectors].map(([selector, truth]) => [
        selector,
        {
          componentId: truth.componentId,
          inputs: [...truth.inputs],
          outputs: [...truth.outputs],
        },
      ]),
    );
  }

  return {
    elementSelectors: serializeSelectors(truthMap.elementSelectors),
    attributeSelectors: serializeSelectors(truthMap.attributeSelectors),
  };
}

export function deserializeTruthMap(truth) {
  function deserializeSelectors(selectors) {
    return new Map(
      Object.entries(selectors ?? {}).map(([selector, value]) => [
        selector,
        {
          componentId: value.componentId,
          inputs: new Set(value.inputs ?? []),
          outputs: new Set(value.outputs ?? []),
        },
      ]),
    );
  }

  return {
    elementSelectors: deserializeSelectors(truth?.elementSelectors),
    attributeSelectors: deserializeSelectors(truth?.attributeSelectors),
  };
}

export function evaluateAnswer(attempt, question, truthMap) {
  if (attempt.skipped) {
    return {
      infra: false,
      skipped: true,
      toolCalls: [],
      toolErrorCount: 0,
      toolErrors: [],
      findings: [],
      checkedElementCount: 0,
      setupOk: null,
      coreClaim: null,
      resultText: null,
      costUsd: null,
    };
  }
  if (attempt.infraError) {
    return {
      infra: true,
      error: attempt.infraError,
      toolCalls: [],
      toolErrorCount: 0,
      toolErrors: [],
      findings: [],
      checkedElementCount: 0,
      setupOk: null,
      coreClaim: null,
      resultText: null,
      costUsd: null,
    };
  }

  const answerText = attempt.responseText ?? '';
  const toolErrors = attempt.toolErrors ?? [];
  const { findings, checkedComponents, checkedElementCount, unknownSelectors } = checkAnswer(
    answerText,
    truthMap,
  );
  const setupOk = question.checks?.includes('setup-mentions-global-css')
    ? mentionsGlobalCssInclusion(answerText)
    : null;
  const coreClaim =
    question.checks?.includes('core-claim-keywords') && question.claimKeywords
      ? checkCoreClaim(answerText, question.claimKeywords)
      : null;

  return {
    infra: false,
    toolCalls: attempt.toolCalls ?? [],
    toolErrorCount: toolErrors.length,
    toolErrors,
    findings,
    checkedComponents,
    checkedElementCount,
    unknownSelectors,
    setupOk,
    coreClaim,
    resultText: answerText,
    mcpServerStatuses: attempt.mcpServerStatuses ?? [],
    costUsd: typeof attempt.costUsd === 'number' ? attempt.costUsd : null,
  };
}

function saveAttempt(result) {
  if (result.skipped) return { skipped: true };
  if (result.infra) return { infraError: result.error };
  return {
    responseText: result.resultText ?? '',
    toolCalls: result.toolCalls ?? [],
    toolErrors: result.toolErrors ?? [],
    mcpServerStatuses: result.mcpServerStatuses ?? [],
    costUsd: typeof result.costUsd === 'number' ? result.costUsd : null,
  };
}

export function createSavedRun(results, truthMap, { createdAt, tarballPath, onlyId, onlyVariant }) {
  return {
    schemaVersion: SAVED_RUN_SCHEMA_VERSION,
    createdAt,
    source: { tarballPath, onlyId, onlyVariant },
    truth: serializeTruthMap(truthMap),
    questions: results.map(({ frage, withServer, withoutServer }) => ({
      question: frage,
      variants: {
        'mit-server': { runs: [saveAttempt(withServer)] },
        'ohne-server': { runs: [saveAttempt(withoutServer)] },
      },
    })),
  };
}

export function reevaluateSavedRun(savedRun) {
  if (savedRun.schemaVersion !== SAVED_RUN_SCHEMA_VERSION) {
    throw new Error(
      `Nicht unterstützte schemaVersion „${savedRun.schemaVersion}“. Erwartet: ${SAVED_RUN_SCHEMA_VERSION}.`,
    );
  }
  const truthMap = deserializeTruthMap(savedRun.truth);
  return savedRun.questions.map(({ question, variants }) => {
    const withServerRuns = variants?.['mit-server']?.runs;
    const withoutServerRuns = variants?.['ohne-server']?.runs;
    if (withServerRuns?.length !== 1 || withoutServerRuns?.length !== 1) {
      throw new Error(`Frage „${question?.id ?? '(ohne id)'}“ muss je Variante genau einen Lauf enthalten.`);
    }
    return {
      frage: question,
      withServer: evaluateAnswer(withServerRuns[0], question, truthMap),
      withoutServer: evaluateAnswer(withoutServerRuns[0], question, truthMap),
    };
  });
}
