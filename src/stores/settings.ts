import { defineStore } from 'pinia';
import { ref, computed, watch, onMounted } from 'vue';
import { usePreferredDark } from '@vueuse/core';
import { Gender, type Language } from '@/types/Settings';

type Theme = 'light' | 'dark' | 'auto';

const textjoinInit = {
  54: -262052143,
};

export const useSettingsStore = defineStore(
  'global-settings',
  () => {
    const lang = ref('CHS' as Language);
    const theme = ref<Theme>('auto');
    const isDark = usePreferredDark();

    const textjoin = ref(textjoinInit as Record<number|string, number>);
    const gender = ref(Gender.Female);
    const nickname = ref('');

    const unachievedPriority = ref(false);

    const getTheme = computed<Theme>(() => {
      return theme.value === 'auto'
        ? (isDark.value ? 'dark' : 'light')
        : theme.value;
    });
    const getNickname = computed(() => {
      return nickname.value !== ''
        ? nickname.value
        : gender.value
          ? '星'
          : '穹';
    });

    function setLang (_lang: Language) {
      lang.value = _lang;
    }

    function toggleTheme () {
      if (getTheme.value === 'dark') {
        theme.value = isDark.value ? 'light' : 'auto';
      } else {
        theme.value = isDark.value ? 'auto' : 'dark';
      }
    }

    function setTextjoin (id: number | string, hash: number) {
      textjoin.value[id] = hash;
    }

    function toggleGender () {
      gender.value = gender.value
        ? Gender.Male
        : Gender.Female;
    }

    function setNickname (_nickname: string) {
      nickname.value = _nickname;
    }

    function toggleUnachievedPriority () {
      unachievedPriority.value = !unachievedPriority.value;
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
      gender,
      nickname,
      unachievedPriority,

      getTheme,
      getNickname,

      setLang,
      setTextjoin,
      toggleTheme,
      toggleGender,
      setNickname,
      toggleUnachievedPriority,
    }
  },
  {
    persist: true,
  },
);
