<template>
  <div id="achievement-box">
    <div class="achievement-toolbox" ref="toolboxHtml">
      <div>
        <a-select
          :style="{width:'160px'}"
          v-model="versionSelected"
          placeholder="全部版本"
          :trigger-props="{ autoFitPopupMinWidth: true }"
          multiple
          scrollbar
          allow-clear
          :allow-search="false"
          :max-tag-count="1"
        >
          <a-option
            v-for="version of versionList"
            :key="version"
            :value="version"
          >
            {{ version }}
          </a-option>
        </a-select>
      </div>
      <a-input :style="{width:'320px'}" v-model="searchText" placeholder="请输入成就名或 ID" allow-clear />
    </div>
    <AchievementItem
      v-for="achievement of achievementsFilter"
      :key="achievement.achievementID"
      :achievement="achievement"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import type { GeneratedAchievement, Version } from '@/types/Achievement';

import AchievementItem from './AchievementItem.vue';

import { useAchievementDataStore } from '@/stores/achievementData';

const achievementDataStore = useAchievementDataStore();

const route = useRoute();

const searchText = ref("");
const versionSelected = ref<Version[]>([]);
const toolboxHtml = ref<any | null>(null);

const versionList = computed(() => {
  const versionSet = new Set<Version>();
  achievementDataStore.getAchievementsBySerieID.forEach((achievement) => {
    versionSet.add(achievement.releaseVersion);
  });
  return [...versionSet].sort((a, b) => b.localeCompare(a));
});

const achievementsFilter = computed(() => {
  let _achievementsFilter: GeneratedAchievement[] = [...achievementDataStore.getAchievementsBySerieID];
  if (versionSelected.value.length !== 0) {
    _achievementsFilter = _achievementsFilter.filter(
      achievement => versionSelected.value.includes(achievement.releaseVersion)
    );
  }
  if (searchText.value) {
    _achievementsFilter = _achievementsFilter.filter((achievement) =>
      achievement.achievementID.toString().includes(searchText.value) ||
      achievement.achievementTitle.includes(searchText.value)
    );
  }
  return _achievementsFilter.sort((a, b) => b.priority - a.priority);
});

// Scroll to top when achievementSerie changes
watch(
  () => route.params.seriesID,
  () => { toolboxHtml.value?.scrollIntoView(); }
);
</script>