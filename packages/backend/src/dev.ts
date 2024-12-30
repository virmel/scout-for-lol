// @ts-types="../generated/client/index.d.ts"
import { PrismaClient } from "@prisma/client";

// {
//     "name": "Jerred",
//     "league": {
//       "leagueAccount": {
//         "id": "T0unTFnLyDJ5TVfhWOQNBI2aZIjDBEw9F73oHrE5idNNZAo",
//         "accountId": "f9SPdxzjg93nJ8W4F44u36cfrldmHzX6IQvKLFKb2J1piw",
//         "puuid":
//           "EjRmQ1H7E1md8UNw_9BwqcIxN3QqKMkP7aPQFLOrIcV5HoH5qulKRCBAT1ibn5EgrljZ82RT1sjccg",
//         "region": "AMERICA_NORTH",
//       },
//       "alts": [],
//     },
//     "discordAccount": { "id": "160509172704739328" },
//   },

// export const database: Database = {
//     servers: {
//       "1092210479755178054": {
//         players: [
//           "T0unTFnLyDJ5TVfhWOQNBI2aZIjDBEw9F73oHrE5idNNZAo",
//         ],
//         channel: "1176684904923279390",
//       },
//     },
//   };

// create records for the above JSON

export const prisma = new PrismaClient();

const player = await prisma.player.create({
  data: {
    discordId: "160509172704739328",
    accounts: {
      create: {
        accountId: "f9SPdxzjg93nJ8W4F44u36cfrldmHzX6IQvKLFKb2J1piw",
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
