import { getChampionName } from "twisted/dist/constants/champions.js";
import { CurrentGameInfoDTO } from "twisted/dist/models-dto/index.js";
import { findParticipant } from "../../api/index.ts";
import { PlayerConfigEntry } from "@scout/data";
import { QueueType } from "@scout/data";
import { map } from "remeda";

export function createDiscordMessage(
  players: PlayerConfigEntry[],
  game: CurrentGameInfoDTO,
  queueType: QueueType | undefined,
): string {
  const participants = players.map((player) => {
    const participant = findParticipant(player, game.participants);
    if (participant === undefined) {
      throw new Error(
        `unable to find participants: ${
          JSON.stringify(
            participants,
          )
        }, ${JSON.stringify(game)}`,
      );
    }
    return { player, participant };
  });

  // TODO: call API to get proper champion name
  const messages = map(participants, (participant) => {
    // TODO: can be removed after https://github.com/Sansossio/twisted/issues/128
    const championName = participant.participant.championId === 893
      ? "Aurora"
      : getChampionName(participant.participant.championId);
    return `${participant.player.name} (${
      championName.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) =>
        char.toUpperCase())
    })`;
  });

  let messageString = messages.join(", ");
  if (messages.length > 1) {
    const lastCommaIndex = messageString.lastIndexOf(",");
    messageString = `${messageString.substring(0, lastCommaIndex)}, and${
      messageString.substring(lastCommaIndex + 1)
    }`;
  }

  return `${messageString} started a ${queueType} game`;
}
