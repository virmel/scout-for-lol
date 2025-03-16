import { REST, Routes } from "discord.js";
import { subscribeCommand } from "./commands/subscribe.ts";
import { unsubscribeCommand } from "./commands/unsubscribe.ts";
import configuration from "../configuration.ts";
import { listSubscriptionsCommand } from "./commands/listSubscriptions.ts";

const commands = [
  subscribeCommand.toJSON(),
  unsubscribeCommand.toJSON(),
  listSubscriptionsCommand.toJSON(),
];

const rest = new REST().setToken(configuration.discordToken);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    const data = await rest.put(
      Routes.applicationCommands(configuration.applicationId),
      { body: commands },
    );

    console.log(`Successfully reloaded application (/) commands: ${data}`);
  } catch (error) {
    console.error(error);
  }
})();
