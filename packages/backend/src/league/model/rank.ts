import { parseDivision, Ranks } from "@discord/data";
import { PlayerConfigEntry } from "@discord/data";
import { Rank } from "@discord/data";
import { TierSchema } from "@discord/data";
import { api } from "../api/api.ts";
import { Constants } from "twisted";
import { SummonerLeagueDto } from "twisted/dist/models-dto/index.js";
import { filter, first, pipe } from "remeda";

const solo = "RANKED_SOLO_5x5";
const flex = "RANKED_FLEX_SR";

export function getDto(
  dto: SummonerLeagueDto[],
  queue: string,
): SummonerLeagueDto | undefined {
  return pipe(
    dto,
    filter((entry: SummonerLeagueDto) => entry.queueType === queue),
    first(),
  );
}

export function getRank(
  dto: SummonerLeagueDto[],
  queue: string,
): Rank | undefined {
  const entry = getDto(dto, queue);
  if (entry == undefined) {
    return undefined;
  }

  const division = parseDivision(entry.rank);
  if (division == undefined) {
    return undefined;
  }

  return {
    division,
    tier: TierSchema.parse(entry.tier.toLowerCase()),
    lp: entry.leaguePoints,
    wins: entry.wins,
    losses: entry.losses,
  };
}

export async function getRanks(player: PlayerConfigEntry): Promise<Ranks> {
  // TODO: get region from player
  const response = await api.League.bySummoner(
    player.league.leagueAccount.id,
    Constants.Regions.AMERICA_NORTH,
  );

  return {
    solo: getRank(response.response, solo),
    flex: getRank(response.response, flex),
  };
}
