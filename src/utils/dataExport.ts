import { useAchieveStateStore, type AchieveStateMap } from '@/stores/achieveState';

export function exportDefaultJson () {
  const achieveStateStore = useAchieveStateStore();
  const achieveState = achieveStateStore.achieveState;
  const json = JSON.stringify(achieveState);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `${generateFileName()}.json`;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

export function importDefaultJson () {
  const achieveStateStore = useAchieveStateStore();
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = () => {
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const json = reader.result as string;
        const data = JSON.parse(json) as AchieveStateMap;
        achieveStateStore.importAchieveState(data);
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

function generateFileName () {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `Fuxuan Achieve 成就导出 ${year}-${month}-${day} ${hour}_${minute}_${second}`;
}