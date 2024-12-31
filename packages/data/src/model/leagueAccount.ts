import { z } from "zod";

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

export type LeagueAccount = z.infer<typeof LeagueAccountSchema>;
export const LeagueAccountSchema = z.strictObject({
  summonerId: LeagueSummonerIdSchema,
  puuid: LeaguePuuidSchema,
  region: RegionSchema,
});
