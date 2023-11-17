<template>
  <div class="sidebar-menu flex-vertical">
    <div class="menu flex-vertical fill-width">
      <RouterLink to="/">
        <div style="font-family: 'FirstWorld'; font-size: 30px;">
          FUXUAN
        </div>
      </RouterLink>

      <AchieveState />
      <AchievementSeriesMenu />
    </div>

    <div class="menu-footer flex-horizontal fill-width">
      <RouterLink to="/setting">
        <button class="center rounded-small">
          <icon-settings :size="30" />
        </button>
      </RouterLink>
      <button @click="settingsStore.toggleTheme()" class="center rounded-small">
        <icon-sun v-if="settingsStore.getTheme==='light'" :size="30" />
        <icon-moon v-else :size="30" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useSettingsStore } from '@/stores/settings';

import { IconSettings, IconSun, IconMoon } from '@arco-design/web-vue/es/icon';
import AchievementSeriesMenu from './AchievementSeriesMenu.vue';
import AchieveState from './AchieveState.vue';

const settingsStore = useSettingsStore();
</script>

<style scoped lang="scss">
.menu-footer {
  justify-content: left;
  padding: 0 10px;

  button {
    width: 40px;
    height: 40px;
    background-color: transparent;

    &:hover {
      background-color: var(--color-fill-4);
    }

    svg {
      color: var(--color-text-1);
    }
  }
}
</style>