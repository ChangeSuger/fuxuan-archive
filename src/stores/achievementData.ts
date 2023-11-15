import { defineStore } from 'pinia';
import { ref, computed, onMounted, watch } from 'vue';
import service from '@/api/service';
import { useSettingsStore } from './settings';
import { calculeTotalAchievement } from '@/utils/achievementCount';
import { useRoute } from 'vue-router';

import type { AchievementMap, AchievementSerieMap, TextMap, GeneratedAchievement, GeneratedAchievementSerie, TextjoinMap, Version } from '@/types/Achievement';

export const useAchievementDataStore = defineStore(
  'achievement-data',
  () => {
    const settingsStore = useSettingsStore();
    const route = useRoute();

    const achievements = ref<AchievementMap>({});
    const achievementSeries = ref<AchievementSerieMap>({});
    const textMap = ref<TextMap>({});

    onMounted(async () => {
      textMap.value = (await service.get(`/data/textMap/TextMap${settingsStore.lang}.json`)).data;

      achievements.value = (await service.get('/data/Achievement.json')).data;

      achievementSeries.value = (await service.get('/data/AchievementSeries.json')).data;
    });

    watch(
      () => settingsStore.lang,
      (newLang) => {
      service.get(`/data/textMap/TextMap${newLang}.json`).then((res) => {
        textMap.value = res.data;
      });
    });

    const getTextMap = computed(() => {
      return textMap.value;
    });

    const getAchievements = computed(() => {
      const generatedAchievements: GeneratedAchievement[] = [];
      Object.keys(achievements.value).forEach((achievementID) => {
        const achievement = achievements.value[achievementID];
        generatedAchievements.push(
          {
            ...achievement,
            achievementTitle: textMap.value[achievement.achievementTitle.Hash],
            achievementDesc: textMap.value[achievement.achievementDesc.Hash],
          }
        );
      });
      return generatedAchievements;
    });

    const getAchievementSeries = computed(() => {
      const generatedAchievementSeries: GeneratedAchievementSerie[] = [];
      Object.keys(achievementSeries.value).forEach(
        (achievementSeriesID) => {
          const achievementSerie = achievementSeries.value[achievementSeriesID];
          generatedAchievementSeries.push(
            {
              ...achievementSerie,
              seriesTitle: textMap.value[achievementSerie.seriesTitle.Hash],
              totalAchievement: calculeTotalAchievement(achievementSerie.seriesID, getAchievements.value),
            }
          );
        }
      );
      return generatedAchievementSeries;
    });

    const getAchievementsBySerieID = computed(() => {
      return getAchievements.value.filter(
        achievement => achievement.seriesID === Number(route.params?.seriesID)
      );
    });

    const getTextjoin = computed(() => {
      const textjoin = settingsStore.textjoin;
      const _textjoin: TextjoinMap = {};
      Object.keys(textjoin).forEach((key) => {
        _textjoin[key] = textMap.value[textjoin[key]];
      });
      return _textjoin;
    });

    const getVersions = computed(() => {
      const versionSet = new Set<Version>();
      getAchievementsBySerieID.value.forEach((achievement) => {
        versionSet.add(achievement.releaseVersion);
      });
      return [...versionSet].sort((a, b) => b.localeCompare(a));
    });

    return {
      getAchievements,
      getAchievementsBySerieID,
      getAchievementSeries,
      getTextMap,
      getTextjoin,
      getVersions,
    }
  }
)