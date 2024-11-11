import { latestVersion } from "./version.ts";
import { assertSnapshot } from "std/testing/snapshot.ts";

Deno.test("should be able to get version", async (t) => {
  await assertSnapshot(t, latestVersion);
});
