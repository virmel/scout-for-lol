import { z } from "zod";
import { LeagueAcccountSchema } from "./leagueAccount.ts";
import { DiscordSchema } from "./discord.ts";

export type PlayerConfigEntry = z.infer<typeof PlayerConfigEntrySchema>;
export const PlayerConfigEntrySchema = z.strictObject({
  name: z.string(),
  league: z.strictObject({
    leagueAccount: LeagueAcccountSchema,
    alts: z.array(LeagueAcccountSchema),
  }),
  discordAccount: DiscordSchema,
});

export type PlayerConfig = z.infer<typeof PlayerConfigSchema>;
export const PlayerConfigSchema = z.array(PlayerConfigEntrySchema);
