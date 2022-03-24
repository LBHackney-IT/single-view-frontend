import { pluralize, removeWhitespace, removeWhitespaceAndCapitalise } from "../string";

describe("remove whitespace", () => {
  test("it removes whitespaces", () => {
    const value = removeWhitespace("A B C D");
    expect(value).toBe("ABCD");
  });

  test("it removes whitespaces and capitalizes", () => {
    const value = removeWhitespaceAndCapitalise("a b c d");
    expect(value).toBe("ABCD");
  });

  test("it returns null if undefined or null", () => {
    expect(removeWhitespace()).toBe(null);
    expect(removeWhitespace(null)).toBe(null);
    expect(removeWhitespaceAndCapitalise()).toBe(null);
    expect(removeWhitespaceAndCapitalise(null)).toBe(null);
  });
});

describe("pluralize", () => {
  test("should pluralize word if value is greater than 1", () => {
    expect(pluralize("word", 2)).toBe("words");
  });

  test("should pluralize word if value is equal to 0", () => {
    expect(pluralize("word", 0)).toBe("words");
  });

  test("should not pluralize word if value is equal to 1", () => {
    expect(pluralize("word", 1)).toBe("word");
  });

  test("should pluralize word and ignore value sign", () => {
    expect(pluralize("word", -2)).toBe("words");
  });
});
