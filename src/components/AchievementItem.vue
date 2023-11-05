<template>
  <div class="achievement-item">
    <button
      class="achievement-button"
      :class="{ achieved: isAchieved, conflict: isConflict }"
      @click="achieveStateStore.setAchieveState(achievement)"
      :disabled="isConflict"
    >
      <icon-close v-if="isConflict" :size="30" />
      <icon-check v-else :size="30" />
    </button>
    <div class="achievement-text">
      <p>
        {{ achievement.achievementTitle }}
        <a-space :size="3">
          <a-badge :text="achievement.releaseVersion"></a-badge>
          <a-badge v-if="achievement.ShowAfterFinish" :text="'隐藏'"></a-badge>
          <a-badge v-if="achievement.conflict" :text="conflictInfo"></a-badge>
        </a-space>
      </p>
      <div class="achievement-description" v-html="descriptionHTML"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { decodeDescription } from '@/utils/decodeText';
import { useAchieveStateStore } from '@/stores/achieveState';

import type { GeneratedAchievement } from '@/types/Achievement';

import { IconCheck, IconClose } from '@arco-design/web-vue/es/icon';

const props = defineProps({
  achievement: {
    type: Object as () => GeneratedAchievement,
    required: true,
  },
});
import { useAchievementDataStore } from '@/stores/achievementData';

const achievementDataStore = useAchievementDataStore();
const achieveStateStore = useAchieveStateStore();

const descriptionHTML = computed(() => decodeDescription(props.achievement, achievementDataStore.getTextjoin));
const isAchieved = computed(() =>
  achieveStateStore.getAchieveState[props.achievement.achievementID]?.isAchieved ?? false
);

const isConflict = computed(() => {
  if (props.achievement.conflict) {
    return props.achievement.conflict.some((achievementID) => {
      return achieveStateStore.getAchieveState[achievementID]?.isAchieved ?? false;
    });
  } else {
    return false;
  }
});

const conflictInfo = computed(() => {
  if (isConflict.value) {
    let info = "分支成就，已完成其中一个分支："
    props.achievement.conflict?.some((achievementID) => {
      if (achieveStateStore.getAchieveState[achievementID].isAchieved) {
        info += achieveStateStore.getAchieveState[achievementID].achievementTitle
        return true;
      } else {
        return false;
      }
    });
    return info;
  } else {
    return "分支成就";
  }
});
</script>