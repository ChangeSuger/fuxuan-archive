<template>
  <a-spin :loading="achievementDataStore.loading" class="fill-width fill-height">
    <div class="achievement-manage flex-vertical">
      <div class="achievement-toolbox flex-horizontal" ref="toolboxHtml">
        <div class="flex-horizontal">
          <a-select
            v-model="versionSelected"
            class="rounded-medium"
            :key="(route.params.seriesID as string)"
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
              v-for="version of versions"
              :key="version"
              :value="version"
            >
              {{ version }}
            </a-option>
          </a-select>

          <a-divider direction="vertical" />

          <a-checkbox v-model="unachievedPriority">优先未完成</a-checkbox>

          <a-divider direction="vertical" />

          <a-tooltip content="分支成就无法自动勾选完成" position="right">
            <a-checkbox
              :model-value="achievementDataStore.getIsAllAchieved"
              @change="toggleAllAchieved"
            >
              全选本页
            </a-checkbox>
          </a-tooltip>
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
  </a-spin>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAchievementDataStore } from '@/stores/achievementData';
import { useAchieveStateStore } from '@/stores/achieveState';
import { useSettingsStore } from '@/stores/settings';

import type { GeneratedAchievement, Version } from '@/types/Achievement';

import AchievementItem from '@/components/AchievementItem.vue';

const achievementDataStore = useAchievementDataStore();
const achieveStateStore = useAchieveStateStore();
const settingsStore = useSettingsStore();

const route = useRoute();

const searchText = ref("");
const versionSelected = ref<Version[]>([]);
const unachievedPriority = ref(settingsStore.unachievedPriority);
const toolboxHtml = ref<any | null>(null);

const versions = computed(() => {
  return achievementDataStore.getVersions;
});

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

function toggleAllAchieved () {
  achieveStateStore.setAchieveStateWithAchievements(achievements.value, !achievementDataStore.getIsAllAchieved);
}

watch(
  () => route.params.seriesID,
  () => {
    // Scroll to top when achievementSerie change
    toolboxHtml.value?.scrollIntoView();

    // clear versionSelected when achievementSerie change
    versionSelected.value = versionSelected.value.filter((v) => {
      return versions.value.includes(v);
    });

    // clear searchText when achievementSerie change
    searchText.value = "";
  }
);

watch(
  () => unachievedPriority.value,
  () => {
    settingsStore.toggleUnachievedPriority();
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