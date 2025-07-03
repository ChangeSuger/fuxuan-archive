import { defineStore } from 'pinia';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import service from '@/api/service';
import { useSettingsStore } from '@/stores/settings';
import { useAchieveStateStore } from '@/stores/achieveState';
import { calculeTotalAchievement } from '@/utils/achievementCount';

import type { AchievementMap, AchievementSerieMap, TextMap, GeneratedAchievement, GeneratedAchievementSerie, TextjoinMap, Version } from '@/types/Achievement';

export const useAchievementDataStore = defineStore(
  'achievement-data',
  () => {
    const settingsStore = useSettingsStore();
    const achieveStateStore = useAchieveStateStore();
    const route = useRoute();

    const loading = ref(true);
    const achievements = ref<AchievementMap>({});
    const achievementSeries = ref<AchievementSerieMap>({});
    const textMap = ref<TextMap>({});

    onMounted(async () => {
      textMap.value = (await service.get(`/data/textMap/TextMap${settingsStore.lang}.json`)).data;

      achievements.value = (await service.get('/data/Achievement.json')).data;

      achievementSeries.value = (await service.get('/data/AchievementSeries.json')).data;

      loading.value = false;
    });

    watch(
      () => settingsStore.lang,
      (newLang) => {
        loading.value = true;
        service.get(`/data/textMap/TextMap${newLang}.json`).then((res) => {
          textMap.value = res.data;
          loading.value = false;
        });
      }
    );

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
            achievementDesc: textMap.value[achievement.achievementDesc.Hash] || '',
            isAchieved: achieveStateStore.achieveState[achievement.achievementID]?.isAchieved ?? false,
            isConflict: achievement.conflict?.some((achievementID) => {
              return achieveStateStore.achieveState[achievementID]?.isAchieved ?? false;
            }) ?? false,
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

    const getIsAllAchieved = computed(() => {
      return getAchievementsBySerieID.value.every((achievement) => achievement.isAchieved || achievement.isConflict);
    });

    return {
      loading,
      getAchievements,
      getAchievementsBySerieID,
      getAchievementSeries,
      getTextMap,
      getTextjoin,
      getVersions,
      getIsAllAchieved,
    }
  }
)