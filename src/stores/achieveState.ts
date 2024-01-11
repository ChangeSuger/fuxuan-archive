import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { AchieveState } from '@/types/AchieveState';
import type { GeneratedAchievement } from '@/types/Achievement';

export type AchieveStateMap = Record<string|number, AchieveState>

export const useAchieveStateStore = defineStore(
  'achieve-state',
  () => {
    const achieveState = ref({} as AchieveStateMap);

    function setAchieveState (achievement: GeneratedAchievement, isAchieved: boolean = !achievement.isAchieved) {
      const { achievementID, achievementTitle, seriesID, rarity } = achievement;
      const state = achieveState.value[achievementID];
      if (state) {
        state.isAchieved = isAchieved;
      } else {
        achieveState.value[achievementID] = {
          achievementID,
          achievementTitle,
          seriesID,
          rarity,
          isAchieved,
        };
      }
    }

    function setAchieveStateWithAchievements (
      achievements: GeneratedAchievement[],
      isAchieved: boolean,
    ) {
      achievements = isAchieved
        ? achievements.filter(achievement => !achievement.conflict)
        : achievements;
      achievements.forEach(achievement => setAchieveState(achievement, isAchieved));
    }

    function clearAchieveState () {
      achieveState.value = {};
    }

    function importAchieveState (_achieveState: AchieveStateMap) {
      achieveState.value = _achieveState;
    }

    return {
      achieveState,
      setAchieveState,
      setAchieveStateWithAchievements,
      clearAchieveState,
      importAchieveState,
    }
  },
  {
    persist: true,
  }
);