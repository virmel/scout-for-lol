import type { CompletedMatch } from "@scout/data";
import { matchToSvg, svgToPng } from "./index.tsx";
import { assertSnapshot } from "@std/testing/snapshot";

function getMatch(): CompletedMatch {
  return {
    "queueType": "solo",
    "player": {
      "playerConfig": {
        "name": "name",
        "league": {
          "alts": [],
          "leagueAccount": {
            "puuid":
              "XtEsV464OFaO3c0_q9REa6wYF0HpC2LK4laLnyM7WhfAVeuDz9biieJ5ZRD049AUCBjLjyBeeezTaw",
            "accountId": "accountId",
            "id": "id",
            "region": "AMERICA_NORTH",
          },
        },
        "discordAccount": {
          "id": "discord id",
        },
      },
      "rankBeforeMatch": {
        "division": 4,
        "tier": "gold",
        "lp": 90,
        "wins": 10,
        "losses": 20,
      },
      "rankAfterMatch": {
        "division": 3,
        "tier": "gold",
        "lp": 0,
        "wins": 50,
        "losses": 30,
      },
      "wins": 10,
      "losses": 20,
      "champion": {
        "summonerName": "zombie villager",
        "championName": "Aatrox",
        "kills": 8,
        "deaths": 9,
        "assists": 4,
        "items": [
          1031,
          0,
          3047,
          3814,
          6691,
          6694,
          3364,
        ],
        "spells": [
          4,
          12,
        ],
        "runes": [],
        "lane": "top",
        "creepScore": 180,
        "visionScore": 19,
        "damage": 18645,
        "gold": 12053,
        "level": 16,
      },
      "outcome": "Defeat",
      "team": "blue",
      "lane": "top",
      "laneOpponent": {
        "summonerName": "CPHS WARRIOR",
        "championName": "Garen",
        "kills": 16,
        "deaths": 7,
        "assists": 1,
        "items": [
          3078,
          3181,
          3046,
          3071,
          3035,
          3006,
          3340,
        ],
        "spells": [
          14,
          4,
        ],
        "runes": [],
        "lane": "top",
        "creepScore": 219,
        "visionScore": 25,
        "damage": 29663,
        "gold": 17426,
        "level": 18,
      },
    },
    "durationInSeconds": 1851,
    "teams": {
      "blue": [
        {
          "summonerName": "Mr Spaghetti",
          "championName": "Aatrox",
          "kills": 8,
          "deaths": 9,
          "assists": 4,
          "items": [
            1031,
            0,
            3047,
            3814,
            6691,
            6694,
            3364,
          ],
          "spells": [
            4,
            12,
          ],
          "runes": [],
          "lane": "top",
          "creepScore": 180,
          "visionScore": 19,
          "damage": 18645,
          "gold": 12053,
          "level": 16,
        },
        {
          "summonerName": "zainji",
          "championName": "Nocturne",
          "kills": 9,
          "deaths": 8,
          "assists": 10,
          "items": [
            1031,
            6631,
            3133,
            3156,
            3047,
            3071,
            3363,
          ],
          "spells": [
            4,
            11,
          ],
          "runes": [],
          "lane": "jungle",
          "creepScore": 188,
          "visionScore": 21,
          "damage": 22737,
          "gold": 13930,
          "level": 15,
        },
        {
          "summonerName": "Neeeeeeelson",
          "championName": "Akali",
          "kills": 8,
          "deaths": 2,
          "assists": 11,
          "items": [
            3089,
            3111,
            3152,
            2055,
            1082,
            4645,
            3364,
          ],
          "spells": [
            12,
            4,
          ],
          "runes": [],
          "lane": "middle",
          "creepScore": 215,
          "visionScore": 27,
          "damage": 23266,
          "gold": 12686,
          "level": 16,
        },
        {
          "summonerName": "aaronchou",
          "championName": "Zeri",
          "kills": 7,
          "deaths": 10,
          "assists": 9,
          "items": [
            1055,
            3006,
            3095,
            6675,
            3046,
            3035,
            3363,
          ],
          "spells": [
            7,
            4,
          ],
          "runes": [],
          "lane": "adc",
          "creepScore": 202,
          "visionScore": 16,
          "damage": 25720,
          "gold": 12583,
          "level": 14,
        },
        {
          "summonerName": "hellorandom",
          "championName": "Lulu",
          "kills": 1,
          "deaths": 4,
          "assists": 18,
          "items": [
            3853,
            3222,
            2055,
            3158,
            3012,
            6620,
            3364,
          ],
          "spells": [
            14,
            4,
          ],
          "runes": [],
          "lane": "support",
          "creepScore": 23,
          "visionScore": 42,
          "damage": 8947,
          "gold": 7665,
          "level": 13,
        },
      ],
      "red": [
        {
          "summonerName": "how2smo",
          "championName": "Garen",
          "kills": 16,
          "deaths": 7,
          "assists": 1,
          "items": [
            3078,
            3181,
            3046,
            3071,
            3035,
            3006,
            3340,
          ],
          "spells": [
            14,
            4,
          ],
          "runes": [],
          "lane": "top",
          "creepScore": 219,
          "visionScore": 25,
          "damage": 29663,
          "gold": 17426,
          "level": 18,
        },
        {
          "summonerName": "Oroulerd",
          "championName": "Zac",
          "kills": 0,
          "deaths": 7,
          "assists": 10,
          "items": [
            6665,
            2055,
            3047,
            1033,
            3068,
            0,
            3364,
          ],
          "spells": [
            11,
            4,
          ],
          "runes": [],
          "lane": "jungle",
          "creepScore": 134,
          "visionScore": 32,
          "damage": 10916,
          "gold": 9051,
          "level": 14,
        },
        {
          "summonerName": "suggsyman",
          "championName": "Viktor",
          "kills": 4,
          "deaths": 7,
          "assists": 4,
          "items": [
            1056,
            6653,
            3020,
            4645,
            3135,
            0,
            3340,
          ],
          "spells": [
            12,
            4,
          ],
          "runes": [],
          "lane": "middle",
          "creepScore": 193,
          "visionScore": 21,
          "damage": 15943,
          "gold": 11613,
          "level": 15,
        },
        {
          "summonerName": "zombie villager",
          "championName": "Yasuo",
          "kills": 9,
          "deaths": 7,
          "assists": 8,
          "items": [
            3026,
            3031,
            0,
            6672,
            6673,
            3006,
            3363,
          ],
          "spells": [
            3,
            4,
          ],
          "runes": [],
          "lane": "adc",
          "creepScore": 247,
          "visionScore": 23,
          "damage": 24510,
          "gold": 15965,
          "level": 16,
        },
        {
          "summonerName": "sjerred",
          "championName": "Xerath",
          "kills": 4,
          "deaths": 5,
          "assists": 15,
          "items": [
            3853,
            4645,
            6653,
            1052,
            3020,
            1058,
            3364,
          ],
          "spells": [
            12,
            4,
          ],
          "runes": [],
          "lane": "support",
          "creepScore": 38,
          "visionScore": 67,
          "damage": 24395,
          "gold": 10759,
          "level": 14,
        },
      ],
    },
  };
}

Deno.test("sanity check", async (t) => {
  const svg = await matchToSvg(getMatch());
  const png = svgToPng(svg);
  Deno.writeFileSync(new URL("__snapshots__/match.png", import.meta.url), png);

  await assertSnapshot(t, svg);
});

Deno.test("no items test", async (t) => {
  const matchNoItems = getMatch();
  matchNoItems.player.champion.items = [0, 0, 0, 0, 0, 0, 0];
  matchNoItems.teams.blue.forEach((
    player,
  ) => (player.items = [0, 0, 0, 0, 0, 0, 0]));
  matchNoItems.teams.red.forEach((
    player,
  ) => (player.items = [0, 0, 0, 0, 0, 0, 0]));

  const svg = await matchToSvg(matchNoItems);
  const png = svgToPng(svg);
  Deno.writeFileSync(
    new URL("__snapshots__/match_no_items.png", import.meta.url),
    png,
  );

  await assertSnapshot(t, svg);
});
Deno.test("all fields zeroed out test", async (t) => {
  const matchZeroedOut = getMatch();
  matchZeroedOut.durationInSeconds = 0;
  matchZeroedOut.player.rankBeforeMatch = {
    wins: 0,
    losses: 0,
    tier: "iron",
    division: 4,
    lp: 0,
  };
  matchZeroedOut.player.rankAfterMatch = {
    wins: 0,
    losses: 0,
    tier: "iron",
    division: 4,
    lp: 0,
  };
  matchZeroedOut.player.wins = 0;
  matchZeroedOut.player.losses = 0;

  matchZeroedOut.player.champion.kills = 0;
  matchZeroedOut.player.champion.deaths = 0;
  matchZeroedOut.player.champion.assists = 0;
  matchZeroedOut.player.champion.items = [0, 0, 0, 0, 0, 0, 0];
  matchZeroedOut.player.champion.creepScore = 0;
  matchZeroedOut.player.champion.visionScore = 0;
  matchZeroedOut.player.champion.damage = 0;
  matchZeroedOut.player.champion.gold = 0;
  matchZeroedOut.player.champion.level = 0;
  matchZeroedOut.teams.blue.forEach((player) => {
    player.kills = 0;
    player.deaths = 0;
    player.assists = 0;
    player.items = [0, 0, 0, 0, 0, 0, 0];
    player.creepScore = 0;
    player.visionScore = 0;
    player.damage = 0;
    player.gold = 0;
    player.level = 0;
  });
  matchZeroedOut.teams.red.forEach((player) => {
    player.kills = 0;
    player.deaths = 0;
    player.assists = 0;
    player.items = [0, 0, 0, 0, 0, 0, 0];
    player.creepScore = 0;
    player.visionScore = 0;
    player.damage = 0;
    player.gold = 0;
    player.level = 0;
  });

  const svg = await matchToSvg(matchZeroedOut);
  const png = svgToPng(svg);
  Deno.writeFileSync(
    new URL("__snapshots__/match_zeroed_out.png", import.meta.url),
    png,
  );

  await assertSnapshot(t, svg);
});

Deno.test("no rank test", async (t) => {
  const matchNoRank = getMatch();
  matchNoRank.player.rankBeforeMatch = undefined;
  matchNoRank.player.rankAfterMatch = undefined;

  const svg = await matchToSvg(matchNoRank);
  const png = svgToPng(svg);
  Deno.writeFileSync(
    new URL("__snapshots__/match_no_rank.png", import.meta.url),
    png,
  );

  await assertSnapshot(t, svg);
});

Deno.test("large values test", async (t) => {
  const matchLargeValues = getMatch();
  matchLargeValues.player.playerConfig.name = "SummonerName12345";
  matchLargeValues.player.champion.championName = "Nunu & Willump";
  matchLargeValues.durationInSeconds = 3660; // 1 hour and 1 minute
  matchLargeValues.player.champion.kills = 45;

  matchLargeValues.teams.blue.forEach((player) => {
    player.summonerName = "SummonerName12345";
    player.championName = "Nunu & Willump";
    player.kills = 45;
    player.deaths = 40;
    player.assists = 50;
    player.items = [3031, 3031, 3031, 3031, 3031, 3031, 3031];
    player.creepScore = 999;
    player.visionScore = 500;
    player.damage = 999999;
    player.gold = 500000;
    player.level = 25;
  });

  matchLargeValues.teams.red.forEach((player) => {
    player.summonerName = "SummonerName12345";
    player.championName = "Nunu & Willump";
    player.kills = 45;
    player.deaths = 0;
    player.assists = 50;
    player.items = [3031, 3031, 3031, 3031, 3031, 3031, 3031];
    player.creepScore = 999;
    player.visionScore = 500;
    player.damage = 999999;
    player.gold = 500000;
    player.level = 25;
  });

  const svg = await matchToSvg(matchLargeValues);
  const png = svgToPng(svg);
  Deno.writeFileSync(
    new URL("__snapshots__/match_large_values.png", import.meta.url),
    png,
  );

  await assertSnapshot(t, svg);
});

Deno.test("victory test", async (t) => {
  const matchVictory = getMatch();
  matchVictory.player.outcome = "Victory";

  const svg = await matchToSvg(matchVictory);
  const png = svgToPng(svg);
  Deno.writeFileSync(
    new URL("__snapshots__/match_victory.png", import.meta.url),
    png,
  );

  await assertSnapshot(t, svg);
});

Deno.test("surrender test", async (t) => {
  const matchSurrender = getMatch();
  matchSurrender.player.outcome = "Surrender";

  const svg = await matchToSvg(matchSurrender);
  const png = svgToPng(svg);
  Deno.writeFileSync(
    new URL("__snapshots__/match_surrender.png", import.meta.url),
    png,
  );

  await assertSnapshot(t, svg);
});

Deno.test("no rank before match test", async (t) => {
  const matchNoRankBefore = getMatch();
  matchNoRankBefore.player.rankBeforeMatch = undefined;
  matchNoRankBefore.player.rankAfterMatch = {
    wins: 50,
    losses: 30,
    tier: "gold",
    division: 3,
    lp: 0,
  };

  const svg = await matchToSvg(matchNoRankBefore);
  const png = svgToPng(svg);
  Deno.writeFileSync(
    new URL("__snapshots__/match_no_rank_before.png", import.meta.url),
    png,
  );

  await assertSnapshot(t, svg);
});
