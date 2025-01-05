import { type Client, MessageFlags } from "discord.js";
import { executeSubscribe } from "./subscribe.ts";
import { executeUnsubscribe } from "./unsubscribe.ts";

export function handleCommands(client: Client) {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    console.log(interaction);

    try {
      if (interaction.commandName === "subscribe") {
        await executeSubscribe(interaction);
      } else if (interaction.commandName === "unsubscribe") {
        await executeUnsubscribe(interaction);
      } else {
        await interaction.reply("Unknown command");
      }
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  });
}
