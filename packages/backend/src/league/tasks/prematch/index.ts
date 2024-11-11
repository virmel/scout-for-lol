import { CurrentGameInfoDTO } from "twisted/dist/models-dto/index.js";
import * as uuid from "uuid";
import {
  getPlayersNotInGame,
  LoadingScreenPlayer,
  type LoadingScreenState,
  parseQueueType,
  PlayerConfigEntry,
} from "@discord/data";
import { createDiscordMessage } from "./discord.ts";
import { send } from "../../discord/channel.ts";
import { getRanks } from "../../model/rank.ts";
import { getPlayerConfigs } from "../../playerConfig.ts";
import { getState, setState } from "../../model/state.ts";
import { getCurrentGame } from "../../api/index.ts";
import { chain, concat, filter, groupBy, map, reject, some, zip } from "remeda";

export async function checkPreMatch() {
  const players = await getPlayerConfigs();

  console.log("filtering out players in game");
  const playersNotInGame = getPlayersNotInGame(players, getState());

  console.log("calling spectator API");
  const playerStatus = await Promise.all(
    map(playersNotInGame, getCurrentGame),
  );

  console.log("filtering players not in game");
  const playersInGame = chain(playersNotInGame)
    .pipe(zip(playerStatus))
    .pipe(filter(([_player, game]) => game != undefined))
    .value() as [PlayerConfigEntry, CurrentGameInfoDTO][];

  console.log("removing games already seen");
  const newGames = reject(
    playersInGame,
    ([_player, game]) =>
      chain(getState().gamesStarted)
        .pipe(map((game) => game.matchId))
        .pipe(some((candidate) => candidate === game.gameId))
        .value(),
  );

  console.log("sending messages");
  await Promise.all(
    chain(newGames)
      .pipe(groupBy(([_player, game]) => game.gameId))
      .pipe(map(async (games) => {
        const players = map(games, ([player, _game]) => player);
        const game = games[0][1];

        const queueType = parseQueueType(game.gameQueueConfigId);

        // record the rank of each player before the game
        const playersWithRank = await Promise.all(
          map(players, async (player): Promise<LoadingScreenPlayer> => {
            const rank = await getRanks(player);
            if (queueType === "solo") {
              return { player, rank: rank.solo };
            } else if (queueType === "flex") {
              return { player, rank: rank.flex };
            } else {
              return { player, rank: undefined };
            }
          }),
        );

        console.log("creating new state entries");
        const entry: LoadingScreenState = {
          added: new Date(game.gameStartTime),
          matchId: game.gameId,
          uuid: uuid.v4(),
          players: playersWithRank,
          queue: queueType,
        };

        const message = createDiscordMessage(players, game, queueType);
        await send(message);

        console.log("saving state");
        setState({
          ...getState(),
          gamesStarted: concat(getState().gamesStarted, entry),
        });
      }))
      .value(),
  );
}
