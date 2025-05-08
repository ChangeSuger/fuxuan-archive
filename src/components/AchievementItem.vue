<template>
  <div class="achievement-item flex-horizontal">
    <button
      class="achievement-button center"
      :class="{ achieved: achievement.isAchieved, conflict: achievement.isConflict }"
      @click="achieveStateStore.setAchieveState(achievement)"
      :disabled="achievement.isConflict"
    >
      <icon-close v-if="achievement.isConflict" :size="30" />
      <icon-check v-else :size="30" />
    </button>
    <div class="achievement-text flex-vertical">
      <p>
        {{ achievement.achievementTitle }}
        <a-space :size="3">
          <!-- <a-badge :text="String(achievement.achievementID)"></a-badge> -->
          <a-badge :text="achievement.releaseVersion"></a-badge>
          <a-badge v-if="achievement.ShowAfterFinish" :text="'隐藏'"></a-badge>
          <a-badge v-if="achievement.conflict" :text="conflictInfo"></a-badge>
        </a-space>
      </p>
      <div class="achievement-description fill-width flex-vertical" v-html="descriptionHTML"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { decodeDescription } from '@/utils/decodeText';
import { useAchievementDataStore } from '@/stores/achievementData';
import { useAchieveStateStore } from '@/stores/achieveState';
import { useSettingsStore } from '@/stores/settings';

import type { GeneratedAchievement } from '@/types/Achievement';

import { IconCheck, IconClose } from '@arco-design/web-vue/es/icon';

const props = defineProps({
  achievement: {
    type: Object as () => GeneratedAchievement,
    required: true,
  },
});

const achievementDataStore = useAchievementDataStore();
const achieveStateStore = useAchieveStateStore();
const settingsStore = useSettingsStore();

const descriptionHTML = computed(
  () => decodeDescription(
    props.achievement,
    achievementDataStore.getTextjoin,
    settingsStore.getNickname
  )
);

const conflictInfo = computed(() => {
  if (props.achievement.isConflict) {
    let info = "互斥成就，已完成其中一个分支："
    props.achievement.conflict?.some((achievementID) => {
      if (achieveStateStore.achieveState[achievementID]?.isAchieved) {
        info += achieveStateStore.achieveState[achievementID].achievementTitle
        return true;
      } else {
        return false;
      }
    });
    return info;
  } else {
    return "互斥成就";
  }
});
</script>