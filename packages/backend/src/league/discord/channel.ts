import { type Message, MessageCreateOptions, MessagePayload } from "discord.js";

export function send(
  options: string | MessagePayload | MessageCreateOptions,
): Promise<Message<true> | Message<false>> {
  // TODO
  // const channel = await client.channels.fetch(
  //   configuration.leagueChannelId,
  // ) as TextChannel;
  // if (!channel) {
  //   throw new Error("invalid channel");
  // }
  // return channel.send(options);
  console.log(`Sending message: ${options}`);
  const promise = new Promise<Message<true> | Message<false>>(
    (resolve, _reject) => {
      resolve({} as Message<true>);
    },
  );
  return promise;
}
