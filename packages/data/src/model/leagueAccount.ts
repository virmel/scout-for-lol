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

export type LeagueAccount = z.infer<typeof LeagueAcccountSchema>;
export const LeagueAcccountSchema = z.strictObject({
  // AKA encrypted summoner ID
  id: z.string().min(0).brand<"LeagueId">(),
  accountId: z.string().min(0).brand<"LeagueAccountId">(),
  puuid: z.string().min(0).brand<"LeaguePuuid">(),
  region: RegionSchema,
});
