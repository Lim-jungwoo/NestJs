export const LANGUAGES = {
  EN: 'en',
  KO: 'ko',
} as const;

export type Language = keyof typeof LANGUAGES;
