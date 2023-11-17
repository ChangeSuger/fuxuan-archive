import { defineStore } from 'pinia';
import { ref, computed, watch, onMounted } from 'vue';
import { usePreferredDark } from '@vueuse/core';
import type { Language } from '@/types/Settings';

type Theme = 'light' | 'dark' | 'auto';

const textjoinInit = {
  54: -262052143,
};

export const useSettingsStore = defineStore(
  'global-settings',
  () => {
    const lang = ref('CHS' as Language);
    const textjoin = ref(textjoinInit as { [id: number | string]: number; });
    const theme = ref<Theme>('auto');
    const isDark = usePreferredDark();

    const getTheme = computed<Theme>(() => {
      return theme.value === 'auto'
        ? (isDark.value ? 'dark' : 'light')
        : theme.value;
    });

    function setLang (_lang: Language) {
      lang.value = _lang;
    }
    function setTextjoin (id: number | string, hash: number) {
      textjoin.value[id] = hash;
    }
    function toggleTheme () {
      if (getTheme.value === 'dark') {
        theme.value = isDark.value ? 'light' : 'auto';
      } else {
        theme.value = isDark.value ? 'auto' : 'dark';
      }
    }

    watch(
      () => getTheme.value,
      (theme) => {
        if (theme === 'light') {
          document.body.removeAttribute('arco-theme');
        } else {
          document.body.setAttribute('arco-theme', 'dark');
        }
      }
    );

    onMounted(() => {
      if (getTheme.value === 'dark') {
        document.body.setAttribute('arco-theme', 'dark');
      }
    });

    return {
      lang,
      textjoin,
      theme,

      getTheme,

      setLang,
      setTextjoin,
      toggleTheme,
    }
  },
  {
    persist: true,
  },
);
