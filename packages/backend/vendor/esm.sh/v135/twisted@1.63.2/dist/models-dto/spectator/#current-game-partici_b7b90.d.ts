import { PerksDTO } from "./perks.dto.d.ts";
import { GameCustomizationObjectDTO } from "./game-customization-object.dto.d.ts";
export declare class CurrentGameParticipantDTO {
  /**
   * The ID of the profile icon used by this participant
   */
  profileIconId: number;
  /**
   * The ID of the champion played by this participant
   */
  championId: number;
  /**
   * The summoner name of this participant
   */
  summonerName: string;
  /**
   * : List of Game Customizations
   */
  gameCustomizationObjects: GameCustomizationObjectDTO[];
  /**
   * Flag indicating whether or not this participant is a bot
   */
  bot: boolean;
  /**
   * Perks/Runes Reforged Information
   */
  perks: PerksDTO;
  /**
   * The ID of the second summoner spell used by this participant
   */
  spell2Id: number;
  /**
   * The team ID of this participant, indicating the participant's team
   */
  teamId: number;
  /**
   * The ID of the first summoner spell used by this participant
   */
  spell1Id: number;
  /**
   * The encrypted summoner ID of this participant
   */
  summonerId: string;
  /**
   * The encrypted puuid of this participant
   */
  puuid: string;
}
