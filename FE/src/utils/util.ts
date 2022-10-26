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
