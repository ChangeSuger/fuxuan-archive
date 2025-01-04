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
      <a-form-item field="gender" label="开拓者的性别">
        <a-switch
          v-model="gender"
          unchecked-color="#DE9EBA"
          checked-color="#767ABA"
          @change="settingsStore.toggleGender()"
        >
          <template #checked>
            穹
          </template>
          <template #unchecked>
            星
          </template>
        </a-switch>
      </a-form-item>

      <a-form-item field="nickname" label="开拓者的昵称">
        <a-input
          v-model="nickname"
          :style="{width:'160px'}"
          :placeholder="settingsStore.getNickname"
          allow-clear
        />
      </a-form-item>

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

      <a-form-item field="textjoin-87" label="晖长石号的命名">
        <a-select
          v-model="textjoin_87"
          class="rounded-small"
          :style="{width:'160px'}"
          :trigger-props="{ autoFitPopupMinWidth: true }"
        >
          <a-option v-for="hash in TEXTJOIN_HASH_MAP[87]" :key="hash" :value="hash">{{ achievementDataStore.getTextMap[hash] }}</a-option>
        </a-select>
      </a-form-item>
    </a-form>

    <a-typography>
      <a-typography-title :heading="4">其他</a-typography-title>
      <a-divider />
    </a-typography>

    <a-space direction="horizontal">
      <a-button
        class="rounded-small"
        style="width: 150px;"
        type="primary"
        @click="importDefaultJson()"
      >
        导入统计数据
      </a-button>

      <a-button
        class="rounded-small"
        style="width: 150px;"
        type="primary"
        @click="exportDefaultJson()"
      >
        导出统计数据
      </a-button>

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
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { useAchievementDataStore } from '@/stores/achievementData';
import { useAchieveStateStore } from '@/stores/achieveState';
import { exportDefaultJson, importDefaultJson } from '@/utils/dataExport';

import { TEXTJOIN_HASH_MAP, langList } from '@/datas/extraData';

import { IconDelete } from '@arco-design/web-vue/es/icon';

const achievementDataStore = useAchievementDataStore();
const settingsStore = useSettingsStore();
const achieveStateStore = useAchieveStateStore();

const langSelected = ref(settingsStore.lang);
const gender = ref(settingsStore.gender);
const nickname = ref(settingsStore.nickname);
const textjoin_54 = ref(settingsStore.textjoin[54]);
const textjoin_87 = ref(settingsStore.textjoin[87]);

const form = ref({});

watch(langSelected, (newLang) => {
  settingsStore.setLang(newLang);
});

watch(nickname, (newNickname) => {
  settingsStore.setNickname(newNickname);
});

watch(textjoin_54, (newTextjoin) => {
  settingsStore.setTextjoin(54, newTextjoin);
});

watch(textjoin_87, (newTextjoin) => {
  settingsStore.setTextjoin(87, newTextjoin);
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
  padding-bottom: 1rem;
}
</style>