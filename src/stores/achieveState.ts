import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { AchieveState } from '@/types/AchieveState';
import type { GeneratedAchievement } from '@/types/Achievement';

export type AchieveStateMap = Record<string|number, AchieveState>

export const useAchieveStateStore = defineStore(
  'achieve-state',
  () => {
    const achieveState = ref({} as AchieveStateMap);

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

    function importAchieveState (_achieveState: AchieveStateMap) {
      achieveState.value = _achieveState;
    }

    return {
      achieveState,
      setAchieveState,
      clearAchieveState,
      importAchieveState,
    }
  },
  {
    persist: true,
  }
);