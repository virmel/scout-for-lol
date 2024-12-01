import { summoner } from "./summoner.ts";
import { assertSnapshot } from "@std/testing/snapshot";

Deno.test("should be able to get champion data", async (t) => {
  await assertSnapshot(t, summoner);
});
