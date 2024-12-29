// @ts-types="../../generated/client/index.d.ts"
import { PrismaClient } from "@prisma/client";
import type { PlayerConfig } from "@scout/data";

export const prisma = new PrismaClient();

export async function getServersSubscribedToPlayers(
  playerIds: string[],
): Promise<{ players: string[]; channel: string }[]> {
  return await prisma.server.findMany({
    where: {
      players: {
        some: {
          id: {
            in: playerIds,
          },
        },
      },
    },
  });
}

export async function getAccounts(): Promise<PlayerConfig> {
  return await prisma.player.findMany();
}
