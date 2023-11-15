import type { GeneratedAchievement, TextjoinMap } from '@/types/Achievement';

const PARAM_REGEX = /#(?<index>[0-9]*?)\[i\](?<percent>%?)/g;
const COLOR_SPAN_REGEX = /<color=(?<color>.*?)>(?<content>.*?)<\/color>/g;
const TEXTJOIN_REGEX = /{TEXTJOIN#(?<id>[0-9]+?)}/g;
const MILLION_REGEX = /#[0-9]*?\[m\]/g;
const NICKNAME_REGEX = /\{NICKNAME\}/g;

export function decodeDescription (
  achievement: GeneratedAchievement,
  textjoin: TextjoinMap,
): string {
  let description: string = achievement.achievementDesc;

  const paramMatcheResults = [...description.matchAll(PARAM_REGEX)];
  paramMatcheResults.forEach((result) => {
    const index = Number(result.groups?.index);
    const percent = result.groups?.percent;
    const value = achievement.paramList[index - 1].Value;
    const replacement = percent
      ? `${(value * 100).toFixed(0)}%`
      : `${value}`;
    description = description.replace(result[0], replacement);
  });

  const millionMatcheResults = [...description.matchAll(MILLION_REGEX)];
  millionMatcheResults.forEach((result) => {
    description = description.replace(result[0], '1000000');
  });

  const nicknameMatchResults = [...description.matchAll(NICKNAME_REGEX)];
  nicknameMatchResults.forEach((result) => {
    description = description.replace(result[0], '星/穹');
  });

  const colorSpanMatcheResults = [...description.matchAll(COLOR_SPAN_REGEX)];
  colorSpanMatcheResults.forEach((result) => {
    description = description.replace(
      result[0],
      `<span style="color: ${result.groups?.color}">${result.groups?.content}</span>`
    );
  });

  const textjoinMatcheResults = [...description.matchAll(TEXTJOIN_REGEX)];
  textjoinMatcheResults.forEach((result) => {
    description = description.replace(
      result[0],
      textjoin[result.groups?.id as string]
    );
  });

  let descriptionHTML = "";
  const subDescriptions = description.split("\\n");
  subDescriptions.forEach((subDescription) => {
    descriptionHTML += `<p>${subDescription}</p>`;
  })

  return descriptionHTML;
}
