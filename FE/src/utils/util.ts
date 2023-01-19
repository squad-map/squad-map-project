import { CategoryType } from '@/interfaces/Category';

export const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;
  return String(err);
};

export const emojiToUnicode = (emoji: string) =>
  emoji.codePointAt(0)?.toString(10);

export const unicodeToEmoji = (unicode: string) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(+unicode)) return '';
  const emoji = String.fromCodePoint(+unicode, 16) as string | unknown;
  return emoji;
};

export const isExistBgColor = (
  mapCategories: CategoryType[],
  color: string
) => {
  const colors = mapCategories.map(
    (category: CategoryType) => category.category_color
  );
  if (colors.includes(color)) return true;
  return false;
};

export const checkDuplicateColor = (
  mapCategories: CategoryType[],
  color: string
) => {
  const existColors = mapCategories.map(
    (category: CategoryType) => category.category_color
  );

  if (existColors.includes(color)) return true;
  return false;
};
