import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { AchieveState } from '@/types/AchieveState';
import type { GeneratedAchievement } from '@/types/Achievement';

export const useAchieveStateStore = defineStore(
  'achieve-state',
  () => {
    const achieveState = ref({} as { [achievementID: number | string]: AchieveState });

    function setAchieveState (achievement: GeneratedAchievement) {
      const achievementID = achievement.achievementID;
      const state = achieveState.value[achievementID];
      if (state) {
        state.isAchieved = !state.isAchieved;
      } else {
        achieveState.value[achievementID] = {
          achievementID,
          achievementTitle: achievement.achievementTitle,
          seriesID: achievement.seriesID,
          rarity: achievement.rarity,
          isAchieved: true,
        };
      }
    }

    function clearAchieveState () {
      achieveState.value = {};
    }

    return {
      achieveState,
      setAchieveState,
      clearAchieveState,
    }
  },
  {
    persist: true,
  }
);