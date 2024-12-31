#!/usr/bin/env deno --allow-write --allow-read --allow-env --allow-ffi
// @ts-types="../../generated/client/index.d.ts"
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const player = await prisma.player.create({
  data: {
    alias: "Jerred",
    discordId: "160509172704739328",
    accounts: {
      create: {
        summonerId: "T0unTFnLyDJ5TVfhWOQNBI2aZIjDBEw9F73oHrE5idNNZAo",
        puuid:
          "EjRmQ1H7E1md8UNw_9BwqcIxN3QqKMkP7aPQFLOrIcV5HoH5qulKRCBAT1ibn5EgrljZ82RT1sjccg",
        region: "AMERICA_NORTH",
      },
    },
  },
});

await prisma.subscription.create({
  data: {
    channelId: "1176684904923279390",
    playerId: player.id,
  },
});
