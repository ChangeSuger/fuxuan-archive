import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Language } from '@/types/Settings';

type Theme = 'light' | 'dark';

const textjoinInit = {
  54: -262052143,
};

export const useSettingsStore = defineStore(
  'global-settings',
  () => {
    const lang = ref('CHS' as Language);
    const textjoin = ref(textjoinInit as { [id: number | string]: number; });
    const theme = ref<Theme>('dark');

    function setLang (_lang: Language) {
      lang.value = _lang;
    }
    function setTextjoin (id: number | string, hash: number) {
      textjoin.value[id] = hash;
    }
    function setTheme (_theme: Theme) {
      if (_theme === 'light') {
        document.body.removeAttribute('arco-theme');
      } else {
        document.body.setAttribute('arco-theme', 'dark');
      }
      theme.value = _theme;
    }

    return {
      lang,
      textjoin,
      theme,

      setLang,
      setTextjoin,
      setTheme,
    }
  },
  {
    persist: true,
  },
);
