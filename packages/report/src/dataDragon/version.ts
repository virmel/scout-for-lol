import { z } from "zod";
import { first } from "remeda";

const versions = z
  .array(z.string())
  .parse(
    await (
      await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    ).json(),
  );

export const latestVersion = first(versions) as string;

if (latestVersion === undefined) {
  throw new Error("latest version is undefined");
}
