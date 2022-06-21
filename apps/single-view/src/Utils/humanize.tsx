export const humanize = (str: string = ""): string => {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/\-/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};
