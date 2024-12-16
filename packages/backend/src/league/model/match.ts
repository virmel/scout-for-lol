import {
  Champion,
  CompletedMatch,
  invertTeam,
  parseQueueType,
  Player,
  Rank,
} from "@discord/data";
import { parseTeam } from "@discord/data";
import { MatchV5DTOs } from "twisted/dist/models-dto/index.js";
import { participantToChampion } from "./champion.ts";
import { match } from "ts-pattern";
import { assert } from "@std/assert";
import { filter, first, map, pipe } from "remeda";

function findParticipant(
  puuid: string,
  participants: MatchV5DTOs.ParticipantDto[],
): MatchV5DTOs.ParticipantDto | undefined {
  return pipe(
    participants,
    filter((participant) => participant.puuid === puuid),
    first(),
  );
}

export function getOutcome(participant: MatchV5DTOs.ParticipantDto) {
  return match(participant)
    .returnType<"Victory" | "Surrender" | "Defeat">()
    .with({ win: true }, () => "Victory")
    .with({ gameEndedInSurrender: true }, () => "Surrender")
    .with({ win: false }, () => "Defeat")
    .exhaustive();
}

function getLaneOpponent(
  player: Champion,
  opponents: Champion[],
): Champion | undefined {
  return pipe(
    opponents,
    filter((opponent) => opponent.lane === player.lane),
    first(),
  );
}

function getTeams(participants: MatchV5DTOs.ParticipantDto[]) {
  return {
    blue: pipe(participants.slice(0, 5), map(participantToChampion)),
    red: pipe(participants.slice(5, 10), map(participantToChampion)),
  };
}

export function toMatch(
  player: Player,
  matchDto: MatchV5DTOs.MatchDto,
  rankBeforeMatch: Rank | undefined,
  rankAfterMatch: Rank | undefined,
): CompletedMatch {
  const participant = findParticipant(
    player.config.league.leagueAccount.puuid,
    matchDto.info.participants,
  );
  if (participant === undefined) {
    console.debug("Player PUUID:", player.config.league.leagueAccount.puuid);
    console.debug("Match Participants:", matchDto.info.participants);
    throw new Error("participant not found");
  }

  const champion = participantToChampion(participant);
  const team = parseTeam(participant.teamId);
  const teams = getTeams(matchDto.info.participants);

  assert(team !== undefined);

  const enemyTeam = invertTeam(team);

  return {
    queueType: parseQueueType(matchDto.info.queueId),
    player: {
      playerConfig: player.config,
      rankBeforeMatch,
      rankAfterMatch,
      wins: player.ranks.solo?.wins || 0,
      losses: player.ranks.solo?.losses || 0,
      champion,
      outcome: getOutcome(participant),
      team: team,
      lane: champion.lane,
      laneOpponent: getLaneOpponent(champion, teams[enemyTeam]),
    },
    durationInSeconds: matchDto.info.gameDuration,
    teams,
  };
}
