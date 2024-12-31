import configuration from "./configuration.ts";
import * as Sentry from "sentry/index.mjs";

Sentry.init({
  dsn: configuration.sentryDsn,
  environment: configuration.environment,
  release: configuration.gitSha,
});

import "./discord/index.ts";
import { startCronJobs } from "./league/cron.ts";

startCronJobs();
