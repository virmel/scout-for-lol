// used with VS Code's task runner to let me debug arbitrary code

import { PlayerConfigEntry } from "@discord/data";
import { Player } from "@discord/data";
import { getRanks } from "./league/model/rank.ts";
import { getPlayerConfigs } from "./league/playerConfig.ts";

export async function getPlayer(
  playerConfig: PlayerConfigEntry,
): Promise<Player> {
  return {
    config: playerConfig,
    ranks: await getRanks(playerConfig),
  };
}

const result = await getPlayer(getPlayerConfigs()[0]);

console.log(result);
