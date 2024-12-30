import { expect, test } from "vitest";
import { matchToImage, toMatch } from "@scout-for-lol/report";
import * as fs from "fs/promises";

test("match snapshot", async () => {
  const matchObj = toMatch(
    {
      config: {
        name: "name",
        league: {
          leagueAccount: {
            puuid:
              "XtEsV464OFaO3c0_q9REa6wYF0HpC2LK4laLnyM7WhfAVeuDz9biieJ5ZRD049AUCBjLjyBeeezTaw",
            accountId: "accountId",
            id: "id",
            region: "AMERICA_NORTH",
          },
        },
        discordAccount: {
          id: "discord id",
        },
      },
      ranks: {
        solo: {
          division: 3,
          tier: "gold",
          lp: 11,
          wins: 10,
          losses: 20,
        },
        flex: {
          division: 1,
          tier: "gold",
          lp: 4,
          wins: 50,
          losses: 30,
        },
      },
    },
    exampleMatch,
    { division: 4, tier: "gold", lp: 11, wins: 10, losses: 20 },
    { division: 1, tier: "gold", lp: 4, wins: 50, losses: 30 },
  );

  const result = await matchToImage(matchObj);
  await fs.writeFile("report.png", result);
  expect(result).toMatchSnapshot();
});
