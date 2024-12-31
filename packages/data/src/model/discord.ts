import { z } from "zod";

export type DiscordAccountId = z.infer<typeof DiscordAccountIdSchema>;
export const DiscordAccountIdSchema = z.string().min(17).max(18).regex(/\d./)
  .brand<
    "DiscordAccountId"
  >();

export type DiscordChannelId = z.infer<typeof DiscordChannelIdSchema>;
export const DiscordChannelIdSchema = z.string().min(17).max(20).regex(/\d./)
  .brand<
    "DiscordChannelId"
  >();

export type Discord = z.infer<typeof DiscordSchema>;
export const DiscordSchema = z.strictObject({
  id: DiscordAccountIdSchema,
});
