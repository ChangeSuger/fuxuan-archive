import type { Rarity } from './Achievement';

export type AchieveState = {
  achievementTitle: string;
  achievementID: number;
  seriesID: number;
  rarity: Rarity;
  isAchieved: boolean;
};
