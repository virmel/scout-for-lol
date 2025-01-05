import { z } from "zod";

export type RegionGroup = z.infer<typeof RegionGroupSchema>;
export const RegionGroupSchema = z.enum([
  "AMERICAS",
  "ASIA",
  "EUROPE",
  "SEA",
]);

export type Region = z.infer<typeof RegionSchema>;
export const RegionSchema = z.enum([
  "BRAZIL",
  "EU_EAST",
  "EU_WEST",
  "KOREA",
  "LAT_NORTH",
  "LAT_SOUTH",
  "AMERICA_NORTH",
  "OCEANIA",
  "TURKEY",
  "RUSSIA",
  "JAPAN",
  "VIETNAM",
  "TAIWAN",
  "THAILAND",
  "SINGAPORE",
  "PHILIPPINES",
  "PBE",
]);

export type LeagueSummonerId = z.infer<typeof LeagueSummonerIdSchema>;
export const LeagueSummonerIdSchema = z.string().min(0).max(63).brand<
  "LeagueSummonerId"
>();
export type LeaguePuuid = z.infer<typeof LeaguePuuidSchema>;
export const LeaguePuuidSchema = z.string().min(78).max(78).brand<
  "LeaguePuuid"
>();

// a riot ID looks like this: game_name#tag_line
export type RiotId = z.infer<typeof RiotIdSchema>;
export const RiotIdSchema = z.string().transform((val) => {
  const [game_name, tag_line] = val.split("#");
  return { game_name, tag_line };
}).pipe(
  z.object({
    game_name: z.string().min(3).max(16),
    tag_line: z.string().min(3).max(5),
  }),
);

export type LeagueAccount = z.infer<typeof LeagueAccountSchema>;
export const LeagueAccountSchema = z.strictObject({
  summonerId: LeagueSummonerIdSchema,
  puuid: LeaguePuuidSchema,
  region: RegionSchema,
});
