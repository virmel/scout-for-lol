import { z } from "zod";
import { LaneSchema } from "./lane.ts";

export type Champion = z.infer<typeof ChampionSchema>;
export const ChampionSchema = z.strictObject({
  riotIdGameName: z.string().min(0),
  championName: z.string().min(0),
  kills: z.number().nonnegative(),
  deaths: z.number().nonnegative(),
  assists: z.number().nonnegative(),
  // TODO: this can actually be higher than 18 in some modes
  level: z.number().min(1).max(18),
  items: z.array(z.number()),
  lane: LaneSchema.optional(),
  spells: z.array(z.number()),
  gold: z.number().nonnegative(),
  runes: z.array(z.strictObject({})),
  creepScore: z.number().nonnegative(),
  visionScore: z.number().nonnegative(),
  damage: z.number().nonnegative(),
});
