import * as Sentry from "sentry/index.mjs";

export function logErrors(fn: () => Promise<unknown>) {
  return async () => {
    try {
      await fn();
    } catch (e) {
      Sentry.captureException(e);
      console.error(e);
    }
  };
}
