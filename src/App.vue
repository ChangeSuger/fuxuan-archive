<template>
  <SidebarMenu />

  <div id="main-view">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import SidebarMenu from '@/components/SidebarMenu.vue';
</script>
