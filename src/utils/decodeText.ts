import type { GeneratedAchievement, TextjoinMap, Param } from '@/types/Achievement';

const PARAM_REGEX = /(?<!=)#(?<index>[1-3])(?<tag>\[[im]\])?(?<percent>%?)/g;
const NICKNAME_REGEX = /\{NICKNAME\}/g;
const COLOR_SPAN_REGEX = /<color=(?<color>.*?)>(?<content>.*?)<\/color>/g;
const TEXTJOIN_REGEX = /{TEXTJOIN#(?<id>[0-9]+?)}/g;

export function decodeDescription (
  achievement: Pick<GeneratedAchievement, "achievementDesc" | "paramList">,
  textjoin: TextjoinMap,
  nickname: string,
): string {
  let description = achievement.achievementDesc;

  description = decodeParams(description, achievement.paramList);

  description = decodeNickname(description, nickname);

  description = decodeColorSpan(description);

  description = decodeTextjoin(description, textjoin);

  return generateDescriptionHTML(description);
}

export function decodeParams (description: string, params: Param[]) {
  const paramMatcheResults = [...description.matchAll(PARAM_REGEX)];
  paramMatcheResults.forEach((result) => {
    const index = Number(result.groups?.index);
    const percent = result.groups?.percent;
    const value = params[index - 1].Value;
    const replacement = percent
      ? `${(result.groups?.tag ? value * 100 : value).toFixed(0)}%`
      : value.toLocaleString('en-US');
    description = description.replace(result[0], replacement);
  });
  return description;
}

export function decodeNickname (description: string, nickname: string) {
  const nicknameMatchResults = [...description.matchAll(NICKNAME_REGEX)];
  nicknameMatchResults.forEach((result) => {
    description = description.replace(result[0], nickname);
  });
  return description;
}

export function decodeColorSpan (description: string) {
  const colorSpanMatcheResults = [...description.matchAll(COLOR_SPAN_REGEX)];
  colorSpanMatcheResults.forEach((result) => {
    description = description.replace(
      result[0],
      `<span style="color: ${result.groups?.color}">${result.groups?.content}</span>`
    );
  });
  return description;
}

export function decodeTextjoin (description: string, textjoin: TextjoinMap) {
  const textjoinMatcheResults = [...description.matchAll(TEXTJOIN_REGEX)];
  textjoinMatcheResults.forEach((result) => {
    description = description.replace(
      result[0],
      textjoin[result.groups?.id as string]
    );
  });
  return description;
}

export function generateDescriptionHTML (description: string) {
  let descriptionHTML = "";
  const subDescriptions = description.split("\\n");
  subDescriptions.forEach((subDescription) => {
    descriptionHTML += `<p>${subDescription}</p>`;
  })
  return descriptionHTML;
}