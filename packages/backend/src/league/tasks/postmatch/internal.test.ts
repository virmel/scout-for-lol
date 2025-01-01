import { MatchV5DTOs } from "twisted/dist/models-dto/index.js";
import {
  ApplicationState,
  Player,
  PlayerConfigEntry,
} from "../../../../../data/src/model/index.ts";
import { send } from "../../discord/channel.ts";
import { checkPostMatchInternal } from "./internal.ts";
import { assertSnapshot } from "@std/testing/snapshot";
import { Message, MessageCreateOptions, MessagePayload } from "discord.js";
import {
  DiscordAccountIdSchema,
  DiscordChannelIdSchema,
  LeaguePuuidSchema,
  LeagueSummonerIdSchema,
} from "@scout/data";

const testdataPath = new URL("testdata/match.json", import.meta.url);

Deno.test("postmatch", async (t) => {
  const state: ApplicationState = {
    gamesStarted: [
      {
        uuid: "uuid",
        added: new Date(),
        matchId: 1,
        players: [{
          player: {
            alias: "name",
            league: {
              leagueAccount: {
                puuid: LeaguePuuidSchema.parse(
                  "XtEsV464OFaO3c0_q9REa6wYF0HpC2LK4laLnyM7WhfAVeuDz9biieJ5ZRD049AUCBjLjyBeeezTaw",
                ),
                summonerId: LeagueSummonerIdSchema.parse("id"),
                region: "AMERICA_NORTH",
              },
            },
            discordAccount: {
              id: DiscordAccountIdSchema.parse("123456789012345678"),
            },
          },
          rank: { division: 3, tier: "gold", lp: 11, wins: 10, losses: 20 },
        }],
      },
    ],
  };
  const saveMatchFn = async (_: MatchV5DTOs.MatchDto) => {
    // do nothing
  };
  const sendFn = (async (
    message: string | MessagePayload | MessageCreateOptions,
  ): Promise<Message<true> | Message<false>> => {
    await assertSnapshot(t, message);
    return Promise.resolve({} as Message<true> | Message<false>);
  }) satisfies typeof send;
  const checkMatchFn = async () => {
    const exampleMatch = JSON.parse(
      (await Deno.readTextFile(testdataPath)).toString(),
    ) as MatchV5DTOs.MatchDto;
    return exampleMatch;
  };
  const getPlayerFn = (
    _: PlayerConfigEntry,
  ): Promise<Player> => {
    return Promise.resolve(
      {
        config: {
          alias: "name",
          league: {
            leagueAccount: {
              puuid: LeaguePuuidSchema.parse(
                "XtEsV464OFaO3c0_q9REa6wYF0HpC2LK4laLnyM7WhfAVeuDz9biieJ5ZRD049AUCBjLjyBeeezTaw",
              ),
              summonerId: LeagueSummonerIdSchema.parse("id"),
              region: "AMERICA_NORTH",
            },
          },
          discordAccount: {
            id: DiscordAccountIdSchema.parse("12345678901234567"),
          },
        },
        ranks: {
          solo: { division: 3, tier: "gold", lp: 11, wins: 10, losses: 20 },
        },
      } satisfies Player,
    );
  };
  const getSubscriptionsFn = () => {
    return Promise.resolve([
      { channel: DiscordChannelIdSchema.parse("12345678901234567") },
    ]);
  };

  await checkPostMatchInternal(
    state,
    saveMatchFn,
    checkMatchFn,
    sendFn,
    getPlayerFn,
    getSubscriptionsFn,
  );
});
