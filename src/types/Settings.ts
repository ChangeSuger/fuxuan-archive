const LANGUAGE_LIST = [
  "CHS",
  "CHT",
  "DE",
  "EN",
  "ES",
  "FR",
  "ID",
  "JP",
  "KR",
  "PT",
  "RU",
  "TH",
  "VI",
] as const;

export type Language = typeof LANGUAGE_LIST[number];

export enum Gender {
  Male,
  Female,
}