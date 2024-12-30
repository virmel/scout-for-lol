// @ts-types="../../generated/client/index.d.ts"
import { PrismaClient } from "@prisma/client";
import {
  DiscordAccountIdSchema,
  type LeagueAccount,
  LeagueAccountIdSchema,
  LeagueIdSchema,
  LeaguePuuidSchema,
  type PlayerConfig,
  type PlayerConfigEntry,
  RegionSchema,
} from "@scout/data";
import { unique } from "remeda";

export const prisma = new PrismaClient();

export async function getChannelsSubscribedToPlayers(
  playerIds: string[],
): Promise<{ channel: string }[]> {
  // the accounts that are subscribed to the players
  const accounts = await prisma.account.findMany({
    where: {
      accountId: {
        in: playerIds,
      },
    },
    include: {
      playerId: {
        include: {
          subscriptions: true,
        },
      },
    },
  });

  return unique(
    accounts.flatMap((account) =>
      account.playerId.subscriptions.map((subscription) => ({
        channel: subscription.channelId,
      }))
    ),
  );
}

export async function getAccounts(): Promise<PlayerConfig> {
  const players = await prisma.player.findMany({
    include: {
      accounts: true,
    },
  });
  // transform
  return players.flatMap((player): PlayerConfigEntry[] => {
    return player.accounts.map((account): PlayerConfigEntry => {
      return {
        name: "none",
        league: {
          leagueAccount: mapToAccount(account),
        },
        discordAccount: {
          id: DiscordAccountIdSchema.parse(player.discordId),
        },
      };
    });
  });
}

function mapToAccount({ id, accountId, puuid, region }: {
  id: number;
  accountId: string;
  puuid: string;
  region: string;
}): LeagueAccount {
  return {
    id: LeagueIdSchema.parse(id),
    accountId: LeagueAccountIdSchema.parse(accountId),
    puuid: LeaguePuuidSchema.parse(puuid),
    region: RegionSchema.parse(region),
  };
}
