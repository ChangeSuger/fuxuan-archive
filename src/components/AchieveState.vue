<template>
  <div class="achieve-state flex-horizontal">
    <span>达成成就</span>
    <span>{{ count }} / {{ all }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAchieveStateStore } from '@/stores/achieveState';
import { useAchievementDataStore } from '@/stores/achievementData';
import { computed } from 'vue';

const achieveStateStore = useAchieveStateStore();
const achievementDataStore = useAchievementDataStore();

const count = computed(() => {
  return Object.values(achieveStateStore.achieveState)
    .filter(achievement => achievement.isAchieved).length;
});

const all = computed(() => {
  let _all = 0;
  achievementDataStore.getAchievementSeries.forEach((serie) => {
    _all += serie.totalAchievement;
  });
  return _all;
})
</script>

<style scoped lang="scss">
.achieve-state {
  width: 90%;
  height: 30px;

  justify-content: space-around;
}
</style>