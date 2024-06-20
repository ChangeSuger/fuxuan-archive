import { ACHIEVEMENT_GROUP_Map } from '@/datas/extraData';

import type { GeneratedAchievement } from '@/types/Achievement';

export function calculeTotalAchievement(
  seriesID: number,
  achievements: GeneratedAchievement[]
): number {
  const totalAchievement = achievements.filter(achievement => achievement.seriesID === seriesID).length;
  const achievementGroup = ACHIEVEMENT_GROUP_Map[seriesID];
  if (achievementGroup) {
    let conflictAchievementCount = 0;
    achievementGroup.forEach(group => {
      conflictAchievementCount += group.length - 1;
    });
    return totalAchievement - conflictAchievementCount;
  } else {
    return totalAchievement;
  }
}
