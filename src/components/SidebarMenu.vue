<template>
  <div class="sidebar-menu">
    <div class="menu">
      <RouterLink to="/">
        <div style="font-family: 'FirstWorld'; font-size: 30px;">
          FUXUAN
        </div>
      </RouterLink>
      <AchieveState />
      <AchievementSeriesMenu />
    </div>

    <div id="menu-footer">
      <RouterLink to="/setting">
        <button>
          <icon-settings :size="30" />
        </button>
      </RouterLink>
      <button @click="toggleTheme">
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

function toggleTheme () {
  if (settingsStore.getTheme === 'dark') {
    settingsStore.setTheme('light');
  } else {
    settingsStore.setTheme('dark');
  }
}

</script>

<style scoped lang="scss">
#menu-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
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