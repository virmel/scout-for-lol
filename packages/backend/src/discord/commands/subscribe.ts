import {
  type ChannelType,
  type ChatInputCommandInteraction,
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { z } from "zod";
import {
  DiscordAccountIdSchema,
  DiscordChannelIdSchema,
  DiscordGuildIdSchema,
  RegionSchema,
  RiotIdSchema,
} from "@scout/data";
import { api, riotApi } from "../../league/api/api.ts";
import { mapRegionToEnum } from "../../league/model/region.ts";
import { prisma } from "../../database/seed.ts";
import { regionToRegionGroup } from "https://esm.sh/v135/twisted@1.61.5/dist/constants/regions.js";

export const subscribeCommand = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Replies with Pong!")
  .addUserOption((option) =>
    option.setName("user").setDescription("The Discord user of the player")
  )
  .addChannelOption((option) =>
    option.setName("channel").setDescription("The channel to post updates to")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("region").setDescription(
      "The region of the League of Legends account",
    ).addChoices(RegionSchema.options.map((region) => {
      return { name: region, value: region };
    }))
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("riot-id").setDescription("The Riot ID to subscribe to")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("alias").setDescription("An alias for the player")
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setContexts(InteractionContextType.Guild);

export async function executeSubscribe(
  interaction: ChatInputCommandInteraction,
) {
  try {
    const user = DiscordAccountIdSchema.optional().parse(
      interaction.options.getUser("user")?.id,
    );
    const channel = DiscordChannelIdSchema.parse(
      interaction.options.getChannel<ChannelType>("channel")?.id,
    );
    const region = RegionSchema.parse(
      interaction.options.getString("region"),
    );
    const riotId = RiotIdSchema.parse(interaction.options.getString("riotId"));
    const alias = z.string().optional().parse(
      interaction.options.getString("alias"),
    );
    const guildId = DiscordGuildIdSchema.parse(interaction.guildId);

    // lookup the user's riot account
    const account = await riotApi.Account.getByRiotId(
      riotId.game_name,
      riotId.tag_line,
      regionToRegionGroup(mapRegionToEnum(region)),
    );

    // get summoner id
    const leagueAccount = await api.Summoner.getByPUUID(
      account.response.puuid,
      mapRegionToEnum(region),
    );

    const player = await prisma.player.create({
      data: {
        alias: alias,
        discordId: user,
        createdTime: new Date(),
        updatedTime: new Date(),
        creatorDiscordId: interaction.user.id,
        serverId: guildId,
        accounts: {
          create: {
            summonerId: leagueAccount.response.id,
            puuid: account.response.puuid,
            region: region,
            createdTime: new Date(),
            updatedTime: new Date(),
            creatorDiscordId: interaction.user.id,
            serverId: guildId,
          },
        },
      },
    });

    await prisma.subscription.create({
      data: {
        channelId: channel,
        playerId: player.id,
        createdTime: new Date(),
        updatedTime: new Date(),
        creatorDiscordId: interaction.user.id,
        serverId: guildId,
      },
    });

    interaction.reply({
      content:
        `Successfully subscribed to updates for ${riotId.game_name}#${riotId.tag_line}`,
      ephemeral: true,
    });
  } catch (error) {
    interaction.reply({
      content: `Error parsing input: ${error}`,
      ephemeral: true,
    });
    return;
  }
}
