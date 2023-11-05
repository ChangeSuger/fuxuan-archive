type Text = {
  Hash: number;
};

type Param = {
  Value: number;
};

export type Rarity = "High" | "Mid" | "Low";

export type Version =
  | "1.0"
  | "1.1"
  | "1.2"
  | "1.3"
  | "1.4"
;

export type AchievementSerie = {
  seriesID: number;
  seriesTitle: Text;
  priority: number;
};

export type AchievementSerieMap = {
  [seriesID: string]: AchievementSerie;
};

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

export type AchievementMap = {
  [achievementID: string]: Achievement;
};

export type TextMap = {
  [hash: number | string]: string;
};

export type VersionMap = {
  [achievmentID: number | string]: Version;
};

export type GeneratedAchievement = {
  achievementID: number;
  seriesID: number;
  achievementTitle: string;
  achievementDesc: string;
  paramList: Param[];
  rarity: Rarity;
  priority: number;
  releaseVersion: Version;
  ShowAfterFinish: boolean;
  conflict?: number[];
};

export type GeneratedAchievementSerie = {
  seriesID: number;
  seriesTitle: string;
  priority: number;
  totalAchievement: number;
};

export type TextjoinMap = {
  [id: number| string]: string;
}