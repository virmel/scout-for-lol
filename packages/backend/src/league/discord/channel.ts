import {
  MessageCreateOptions,
  MessagePayload,
  type TextChannel,
} from "discord.js";
import configuration from "../../configuration.ts";
import client from "../../discord/client.ts";

export async function send(
  options: string | MessagePayload | MessageCreateOptions,
) {
  const channel = await client.channels.fetch(
    configuration.leagueChannelId,
  ) as TextChannel;
  if (!channel) {
    throw new Error("invalid channel");
  }
  return channel.send(options);
}
