<template>
  <SidebarMenu />

  <div id="main-view">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useSettingsStore } from './stores/settings';

import SidebarMenu from '@/components/SidebarMenu.vue';

onMounted(() => {
  const settingsStore = useSettingsStore();
  if (settingsStore.theme === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  }
});
</script>
