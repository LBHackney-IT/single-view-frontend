export const removeWhitespace = (value?: string | null): string | null => {
  if (value === null || value === undefined) {
    return null;
  }
  return value.replace(/\s/g, "");
};

export const removeWhitespaceAndCapitalise = (value?: string | null): string | null => {
  if (value === null || value === undefined) {
    return null;
  }
  return removeWhitespace(value.toUpperCase());
};

export const pluralize = (word: string, value: number): string =>
  `${word}${Math.abs(value) !== 1 ? "s" : ""}`;
