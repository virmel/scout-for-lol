import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const subscribeCommand = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Replies with Pong!");

export async function executeSubscribe(interaction: CommandInteraction) {
  await interaction.reply("Pong!");
}
