<template>
  <div class="achievement-manage flex-vertical">
    <div class="achievement-toolbox flex-horizontal" ref="toolboxHtml">
      <div class="flex-horizontal">
        <a-select
          v-model="versionSelected"
          class="rounded-medium"
          :style="{width:'160px'}"
          placeholder="全部版本"
          :trigger-props="{ autoFitPopupMinWidth: true }"
          multiple
          scrollbar
          allow-clear
          :allow-search="false"
          :max-tag-count="1"
        >
          <a-option
            v-for="version of achievementDataStore.getVersions"
            :key="version"
            :value="version"
          >
            {{ version }}
          </a-option>
        </a-select>

        <a-divider direction="vertical" />

        <a-checkbox v-model="unachievedPriority">优先未完成</a-checkbox>

        <!-- <a-divider direction="vertical" /> -->

        <!-- <a-checkbox v-model="hideAchieved">隐藏已完成</a-checkbox> -->
      </div>

      <a-input
        v-model="searchText"
        class="rounded-medium"
        :style="{width:'320px'}"
        placeholder="请输入成就名或 ID"
        allow-clear
      />
    </div>

    <AchievementItem
      v-for="achievement of achievements"
      :key="achievement.achievementID"
      :achievement="achievement"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAchievementDataStore } from '@/stores/achievementData';

import type { GeneratedAchievement, Version } from '@/types/Achievement';

import AchievementItem from '@/components/AchievementItem.vue';

const achievementDataStore = useAchievementDataStore();

const route = useRoute();

const searchText = ref("");
const versionSelected = ref<Version[]>([]);
const unachievedPriority = ref(false);
// const hideAchieved = ref(false);
const toolboxHtml = ref<any | null>(null);

const ascending = (a: GeneratedAchievement, b: GeneratedAchievement) => b.priority - a.priority;

const filterAchievementsByVersionAndSearchText = (achievements: GeneratedAchievement[]) => {
  if (versionSelected.value.length !== 0) {
    achievements = achievements.filter(
      achievement => versionSelected.value.includes(achievement.releaseVersion)
    );
  }
  if (searchText.value) {
    achievements = achievements.filter((achievement) =>
      achievement.achievementID.toString().includes(searchText.value) ||
      achievement.achievementTitle.includes(searchText.value)
    );
  }
  return achievements.sort(ascending);
};

const ClassifyAchievementsByIsAchieved = (achievements: GeneratedAchievement[]) => {
  return [
    achievements.filter(achievement => achievement.isAchieved || achievement.isConflict),
    achievements.filter(achievement => !(achievement.isAchieved || achievement.isConflict)),
  ];
};

const achievements = computed(() => {
  let _achievements: GeneratedAchievement[] = [...achievementDataStore.getAchievementsBySerieID];
  if (unachievedPriority.value) {
    const [achievementsAchieved, achievementsUnachieved] = ClassifyAchievementsByIsAchieved(_achievements);
    _achievements = [
      ...filterAchievementsByVersionAndSearchText(achievementsUnachieved),
      ...filterAchievementsByVersionAndSearchText(achievementsAchieved),
    ];
  } else {
    _achievements = filterAchievementsByVersionAndSearchText(_achievements);
  }
  return _achievements;
});

watch(
  () => route.params.seriesID,
  () => {
    // Scroll to top when achievementSerie change
    toolboxHtml.value?.scrollIntoView();

    // clear versionSelected when achievementSerie change
    versionSelected.value = [];

    // clear searchText when achievementSerie change
    searchText.value = "";
  }
);
</script>

<style scoped lang="scss">
.achievement-toolbox {
  width: calc(100% - 1rem);
  padding-top: 0.5rem;
  height: 40px;
  justify-content: space-between;
}
</style>