import {
  type Message,
  MessageCreateOptions,
  MessagePayload,
  type TextChannel,
} from "discord.js";
import client from "../../discord/client.ts";

export async function send(
  options: string | MessagePayload | MessageCreateOptions,
  channelId: string,
): Promise<Message<true> | Message<false>> {
  const channel = await client.channels.fetch(
    channelId,
  ) as TextChannel;
  if (!channel) {
    throw new Error("invalid channel");
  }
  console.log(`Sending message: ${options}`);
  return channel.send(options);
}
