import { getChampionName } from "twisted/dist/constants/champions.js";
import { CurrentGameInfoDTO } from "twisted/dist/models-dto/index.js";
import { findParticipant } from "../../api/index.ts";
import { PlayerConfigEntry } from "@discord/data";
import { QueueType } from "@discord/data";
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
    const championName = getChampionName(participant.participant.championId);
    return `${participant.player.name} started a ${queueType} game as ${
      championName.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) =>
        char.toUpperCase())
    }`;
  });

  return messages.join("\n");
}
