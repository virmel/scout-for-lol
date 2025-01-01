import { z } from "zod";
import { LeagueAccountSchema } from "./leagueAccount.ts";
import { DiscordSchema } from "./discord.ts";

export type PlayerConfigEntry = z.infer<typeof PlayerConfigEntrySchema>;
export const PlayerConfigEntrySchema = z.strictObject({
  alias: z.string().optional(),
  league: z.strictObject({
    leagueAccount: LeagueAccountSchema,
  }),
  discordAccount: DiscordSchema,
});

export type PlayerConfig = z.infer<typeof PlayerConfigSchema>;
export const PlayerConfigSchema = z.array(PlayerConfigEntrySchema);
