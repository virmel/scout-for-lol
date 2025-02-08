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
  toReadableRegion,
} from "@scout/data";
import { api, riotApi } from "../../league/api/api.ts";
import { mapRegionToEnum } from "../../league/model/region.ts";
import { regionToRegionGroup } from "twisted/dist/constants/regions.js";
import { prisma } from "../../database/index.ts";
import { fromError } from "zod-validation-error";

export const subscribeCommand = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Subscribe to updates for a League of Legends account")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("The channel to post messages to")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("region")
      .setDescription("The region of the League of Legends account")
      .addChoices(
        RegionSchema.options.map((region) => {
          return { name: toReadableRegion(region), value: region };
        }),
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("riot-id")
      .setDescription(
        "The Riot ID to subscribe to in the format of <name>#<tag>",
      )
      .setRequired(true)
  )
  .addUserOption((option) =>
    option.setName("user").setDescription("The Discord user of the player")
  )
  .addStringOption((option) =>
    option
      .setName("alias")
      .setDescription("An alias for the player")
      // TODO: make this optional
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setContexts(InteractionContextType.Guild);

export const ArgsSchema = z.object({
  channel: DiscordChannelIdSchema,
  region: RegionSchema,
  riotId: RiotIdSchema,
  user: DiscordAccountIdSchema.optional(),
  alias: z.string().optional(),
  guildId: DiscordGuildIdSchema,
});

export async function executeSubscribe(
  interaction: ChatInputCommandInteraction,
) {
  let args: z.infer<typeof ArgsSchema>;

  try {
    args = ArgsSchema.parse({
      channel: interaction.options.getChannel<ChannelType>("channel")?.id,
      region: interaction.options.getString("region"),
      riotId: interaction.options.getString("riot-id"),
      user: interaction.options.getUser("user")?.id,
      alias: interaction.options.getString("alias"),
      guildId: interaction.guildId,
    });
  } catch (error) {
    const validationError = fromError(error);
    await interaction.reply({
      content: validationError.toString(),
      ephemeral: true,
    });
    return;
  }

  const { channel, region, riotId, user, alias, guildId } = args;

  let puuid: string;
  try {
    const account = await riotApi.Account.getByRiotId(
      riotId.game_name,
      riotId.tag_line,
      regionToRegionGroup(mapRegionToEnum(region)),
    );
    puuid = account.response.puuid;
  } catch (error) {
    await interaction.reply({
      content: `Error looking up Riot ID: ${error}`,
      ephemeral: true,
    });
    return;
  }

  let summonerId: string;
  try {
    const leagueAccount = await api.Summoner.getByPUUID(
      puuid,
      mapRegionToEnum(region),
    );
    summonerId = leagueAccount.response.id;
  } catch (error) {
    await interaction.reply({
      content: `Error looking up summoner ID: ${error}`,
      ephemeral: true,
    });
    return;
  }

  const now = new Date();

  try {
    const player = await prisma.player.create({
      data: {
        alias: alias,
        discordId: user,
        createdTime: now,
        updatedTime: now,
        creatorDiscordId: interaction.user.id,
        serverId: guildId,
        accounts: {
          create: {
            summonerId,
            puuid,
            region,
            createdTime: now,
            updatedTime: now,
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
        createdTime: now,
        updatedTime: now,
        creatorDiscordId: interaction.user.id,
        serverId: guildId,
      },
    });

    await interaction.reply({
      content:
        `Successfully subscribed to updates for ${riotId.game_name}#${riotId.tag_line}`,
      ephemeral: true,
    });
  } catch (error) {
    await interaction.reply({
      content: `Error creating database records: ${error}`,
      ephemeral: true,
    });
  }
}
