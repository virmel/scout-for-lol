import { Constants } from "twisted";
import { MatchV5DTOs } from "twisted/dist/models-dto/index.js";
import { z } from "zod";
import { api } from "../../api/api.ts";
import {
  AttachmentBuilder,
  EmbedBuilder,
  Message,
  MessageCreateOptions,
  MessagePayload,
} from "discord.js";
import { matchToImage } from "../../image/html/index.tsx";
import {
  ApplicationState,
  CompletedMatch,
  LoadingScreenState,
  Player,
  PlayerConfigEntry,
} from "@discord/data";
import { getState, setState } from "../../model/state.ts";
import { toMatch } from "../../model/match.ts";
import { differenceWith, filter, first, map, pipe } from "remeda";

export async function checkMatch(game: LoadingScreenState) {
  try {
    // TODO: get region from player
    const response = await api.MatchV5.get(
      `NA1_${game.matchId}`,
      Constants.RegionGroups.AMERICAS,
    );
    return response.response;
  } catch (e) {
    const result = z.object({ status: z.number() }).safeParse(e);
    if (result.success) {
      if (result.data.status == 404) {
        // game not done
        return undefined;
      }
    }
    console.error(e);
    return undefined;
  }
}

export async function saveMatch(_match: MatchV5DTOs.MatchDto) {
  // TODO
}

async function getImage(
  match: CompletedMatch,
): Promise<[AttachmentBuilder, EmbedBuilder]> {
  const image = await matchToImage(match);
  const attachment = new AttachmentBuilder(image).setName("match.png");
  const embed = new EmbedBuilder().setImage(`attachment://${attachment.name}`);
  return [attachment, embed];
}

async function createMatchObj(
  state: LoadingScreenState,
  match: MatchV5DTOs.MatchDto,
  getPlayerFn: (playerConfig: PlayerConfigEntry) => Promise<Player>,
) {
  const player = pipe(
    match.info.participants,
    filter((participant) =>
      // TODO: why are we grabbing player zero? -- I think it's because I was halfway through adding multi-player support e.g. for flex and duo queue
      participant.puuid === state.players[0].player.league.leagueAccount.puuid
    ),
    first(),
  );

  if (player == undefined) {
    throw new Error(
      `unable to find player ${JSON.stringify(state)}, ${
        JSON.stringify(match)
      }`,
    );
  }

  const fullPlayer = await getPlayerFn(state.players[0].player);

  // TODO use correct rank
  return toMatch(
    fullPlayer,
    match,
    state.players[0].rank,
    fullPlayer.ranks.solo,
  );
}

export async function checkPostMatchInternal(
  state: ApplicationState,
  saveFn: (match: MatchV5DTOs.MatchDto) => Promise<void>,
  checkFn: (
    game: LoadingScreenState,
  ) => Promise<MatchV5DTOs.MatchDto | undefined>,
  sendFn: (
    message: string | MessagePayload | MessageCreateOptions,
  ) => Promise<Message<true> | Message<false>>,
  getPlayerFn: (playerConfig: PlayerConfigEntry) => Promise<Player>,
) {
  console.log("checking match api");
  const games = await Promise.all(state.gamesStarted.map(checkFn));

  console.log("removing games in progress");
  const finishedGames = pipe(
    state.gamesStarted,
    (gamesStarted) => gamesStarted.map((game, index) => [game, games[index]]),
    filter(([_game, match]) => match != undefined),
  ) as [LoadingScreenState, MatchV5DTOs.MatchDto][];

  // TODO: send duo queue message
  console.log("sending messages");
  await Promise.all(
    map(finishedGames, async ([state, matchDto]) => {
      await saveFn(matchDto);

      const matchObj = await createMatchObj(state, matchDto, getPlayerFn);

      const [attachment, embed] = await getImage(matchObj);
      await sendFn({ embeds: [embed], files: [attachment] });

      console.log("calculating new state");
      const newState = getState();
      const newMatches = differenceWith(
        newState.gamesStarted,
        map(finishedGames, (game) => game[0]),
        (left, right) => left.uuid === right.uuid,
      );

      console.log("saving state files");
      setState({
        ...state,
        gamesStarted: newMatches,
      });
    }),
  );
}
