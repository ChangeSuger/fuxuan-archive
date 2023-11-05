<template>
  <RouterLink :to="`/achievement/${achievementSerie.seriesID}`">
    <div class="achievement-serie">
      <p class="achievement-serie-title">{{ achievementSerie.seriesTitle }}</p>
      <p class="achievement-serie-subtext">{{ `${achieveCount} / ${achievementSerie.totalAchievement} - (${percent}%)` }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAchieveStateStore } from '@/stores/achieveState';
import { computed } from 'vue';

import type { GeneratedAchievementSerie } from '@/types/Achievement';

const props = defineProps({
  achievementSerie: {
    type: Object as () => GeneratedAchievementSerie,
    required: true,
  },
});

const achieveStateStore = useAchieveStateStore();

const achieveCount = computed(() => {
  return Object.values(achieveStateStore.getAchieveState)
    .filter(achievement =>
      achievement.seriesID === props.achievementSerie.seriesID &&
      achievement.isAchieved
    ).length;
});

const percent = computed(() => {
  return Math.round((achieveCount.value / props.achievementSerie.totalAchievement) * 100);
});
</script>

<style scoped>

</style>