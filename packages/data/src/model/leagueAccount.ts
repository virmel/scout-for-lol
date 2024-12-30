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

export const LeagueIdSchema = z.string().min(0).brand<"LeagueId">();
export const LeagueAccountIdSchema = z.string().min(0).brand<
  "LeagueAccountId"
>();
export const LeaguePuuidSchema = z.string().min(0).brand<"LeaguePuuid">();

export type LeagueAccount = z.infer<typeof LeagueAccountSchema>;
export const LeagueAccountSchema = z.strictObject({
  // AKA encrypted summoner ID
  id: LeagueIdSchema,
  accountId: LeagueAccountIdSchema,
  puuid: LeaguePuuidSchema,
  region: RegionSchema,
});
