import { z } from "zod";

export const DiscordAccountIdSchema = z.string().min(0).brand<
  "DiscordAccountId"
>();

export type Discord = z.infer<typeof DiscordSchema>;
export const DiscordSchema = z.strictObject({
  id: DiscordAccountIdSchema,
});
