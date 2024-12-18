import Configuration from "../configuration.ts";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

console.log("Logging into Discord");

await client.login(Configuration.discordToken);

console.log("Logged into Discord");

export default client;
