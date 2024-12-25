import { assert } from "@std/assert";
import configuration from "./configuration.ts";

// health check used by Docker
try {
  const response = await fetch(`http://127.0.0.1:${configuration.port}/ping`);
  assert(response.ok);
  Deno.exit(0);
} catch (_) {
  Deno.exit(1);
}
