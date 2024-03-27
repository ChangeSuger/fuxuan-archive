type Text = {
  Hash: number;
};

export type Param = { Value: number; };

export type Rarity = "High" | "Mid" | "Low";

const VERSION_LIST = [
  '1.0',
  '1.1',
  '1.2',
  '1.3',
  '1.4',
  '1.5',
  '1.6',
  '2.0',
  '2.1',
] as const;

export type Version = typeof VERSION_LIST[number]

export type AchievementSerie = {
  seriesID: number;
  seriesTitle: Text;
  priority: number;
};

export type AchievementSerieMap = Record<string, AchievementSerie>

export type Achievement = {
  achievementID: number;
  seriesID: number;
  achievementTitle: Text;
  achievementDesc: Text;
  paramList: Param[];
  rarity: Rarity;
  priority: number;
  releaseVersion: Version;
  ShowAfterFinish: boolean;
  conflict?: number[];
};

export type AchievementMap = Record<string, Achievement>

export type TextMap = Record<number|string, string>

export type VersionMap = Record<number | string, Version>

type AchievementState = {
  achievementTitle: string;
  achievementDesc: string;
  isAchieved: boolean;
  isConflict: boolean;
}

type AchievementSerieState = {
  seriesTitle: string;
  totalAchievement: number;
}

export type GeneratedAchievement =
  Omit<Achievement, 'achievementTitle' | 'achievementDesc'> & AchievementState;

export type GeneratedAchievementSerie =
  Omit<AchievementSerie, 'seriesTitle'> & AchievementSerieState;

export type TextjoinMap = Record<number|string, string>