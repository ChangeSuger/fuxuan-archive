import { ACHIEVEMENT_GROUP_LIST } from '@/datas/extraData';

import type { GeneratedAchievement } from '@/types/Achievement';

export function calculeTotalAchievement(
  seriesID: number,
  achievements: GeneratedAchievement[]
): number {
  const totalAchievement = achievements.filter(achievement => achievement.seriesID === seriesID).length;
  if (seriesID === 5) {
    let achievementCount = 0;
    ACHIEVEMENT_GROUP_LIST.forEach(group => {
      achievementCount += group.length - 1;
    });
    return totalAchievement - achievementCount;
  } else {
    return totalAchievement;
  }
}
