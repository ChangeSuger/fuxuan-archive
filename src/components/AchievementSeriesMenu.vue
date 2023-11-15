<template>
  <div class="achievement-sidebar fill-width flex-vertical">
    <AchievementSerieItem
      v-for="achievementSerie of achievementSeriesSorted"
      :key="achievementSerie.seriesID"
      :achievement-serie="achievementSerie"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAchievementDataStore } from '@/stores/achievementData';

import AchievementSerieItem from '@/components/AchievementSerieItem.vue';

const achievementDataStore = useAchievementDataStore();

const achievementSeriesSorted = computed(() => {
  return [...achievementDataStore.getAchievementSeries]
    .sort((a, b) => b.priority - a.priority);
});
</script>