<template>
  <div id="setting-box">
    <a-typography>
      <a-typography-title>设置</a-typography-title>
      <a-divider />
    </a-typography>

    <a-typography>
      <a-typography-title :heading="4">基础设置</a-typography-title>
      <a-divider />
    </a-typography>

    <a-form :model="form" auto-label-width>
      <a-form-item field="language" label="语言">
        <a-select
          v-model="langSelected"
          class="rounded-small"
          :style="{width:'160px'}"
          :trigger-props="{ autoFitPopupMinWidth: true }"
        >
          <a-option v-for="lang in langList" :key="lang.value" :value="lang.value">{{ lang.text }}</a-option>
        </a-select>
      </a-form-item>
    </a-form>

    <a-typography>
      <a-typography-title :heading="4">文本插值设置</a-typography-title>
      <a-typography-text type="secondary">部分成就的文本内容会与特定的选项相关联</a-typography-text>
      <a-divider />
    </a-typography>

    <a-form :model="form" auto-label-width>
      <a-form-item field="textjoin-54" label="以太战线中以太灵「次元扑满」的命名">
        <a-select
          v-model="textjoin_54"
          class="rounded-small"
          :style="{width:'160px'}"
          :trigger-props="{ autoFitPopupMinWidth: true }"
        >
          <a-option v-for="hash in TEXTJOIN_HASH_MAP[54]" :key="hash" :value="hash">{{ achievementDataStore.getTextMap[hash] }}</a-option>
        </a-select>
      </a-form-item>
    </a-form>

    <a-typography>
      <a-typography-title :heading="4">其他</a-typography-title>
      <a-divider />
    </a-typography>

    <a-button
      class="rounded-small"
      style="width: 150px;"
      type="primary"
      status="danger"
      @click="achieveStateStore.clearAchieveState()"
    >
      <template #icon>
        <icon-delete />
      </template>
      <template #default>
        清除统计数据
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { useAchievementDataStore } from '@/stores/achievementData';
import { useAchieveStateStore } from '@/stores/achieveState';

import { TEXTJOIN_HASH_MAP, langList } from '@/datas/extraData';

import { IconDelete } from '@arco-design/web-vue/es/icon';

const achievementDataStore = useAchievementDataStore();
const settingsStore = useSettingsStore();
const achieveStateStore = useAchieveStateStore();

const langSelected = ref(settingsStore.getLang);

const textjoin_54 = ref(settingsStore.getTextjoin[54]);

const form = ref({});

watch(langSelected, (newLang) => {
  settingsStore.setLang(newLang);
});

watch(textjoin_54, (newTextjoin) => {
  settingsStore.setTextjoin(54, newTextjoin);
});
</script>

<style scoped>
#setting-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-left: 20px;
}
</style>