import { Player } from "@scout/data";
import { PlayerConfigEntry } from "@scout/data";
import { getRanks } from "./rank.ts";

export async function getPlayer(
  playerConfig: PlayerConfigEntry,
): Promise<Player> {
  return {
    config: playerConfig,
    ranks: await getRanks(playerConfig),
  };
}
