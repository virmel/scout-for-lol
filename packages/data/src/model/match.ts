import { z } from "zod";
import { type Champion, ChampionSchema } from "./champion.ts";
import { RosterSchema } from "./roster.ts";
import { TeamSchema } from "./team.ts";
import { LaneSchema } from "./lane.ts";
import { QueueTypeSchema } from "./state.ts";
import { RankSchema } from "./rank.ts";
import { PlayerConfigEntrySchema } from "./playerConfig.ts";
import { filter, first, pipe } from "remeda";

export type CompletedMatch = z.infer<typeof CompletedMatchSchema>;
export const CompletedMatchSchema = z.strictObject({
  durationInSeconds: z.number().nonnegative(),
  queueType: QueueTypeSchema.optional(),
  // this field stores data specific to the player we care about
  // TODO: it would be good to de-dupe this data w/ the teams info
  player: z.strictObject({
    playerConfig: PlayerConfigEntrySchema,
    wins: z.number().nonnegative(),
    losses: z.number().nonnegative(),
    outcome: z.enum(["Victory", "Defeat", "Surrender"]),
    champion: ChampionSchema,
    team: TeamSchema,
    lane: LaneSchema.optional(),
    laneOpponent: ChampionSchema.optional(),
    rankBeforeMatch: RankSchema.optional(),
    rankAfterMatch: RankSchema.optional(),
  }),
  teams: z.strictObject({
    red: RosterSchema,
    blue: RosterSchema,
  }),
});

export function getLaneOpponent(
  player: Champion,
  opponents: Champion[],
): Champion | undefined {
  return pipe(
    opponents,
    filter((opponent) => opponent.lane === player.lane),
    first(),
  );
}
