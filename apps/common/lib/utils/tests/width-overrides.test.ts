import widthOverrides from "../width-overrides";

test("it should return override for 1", () => {
  expect(widthOverrides(1)).toBe("govuk-!-width-full");
});

test("it should return override for 1/2", () => {
  expect(widthOverrides(1 / 2)).toBe("govuk-!-width-one-half");
});

test("it should return override for 1/3", () => {
  expect(widthOverrides(1 / 3)).toBe("govuk-!-width-one-third");
});

test("it should return override for 2/3", () => {
  expect(widthOverrides(2 / 3)).toBe("govuk-!-width-two-thirds");
});

test("it should return override for 1/4", () => {
  expect(widthOverrides(1 / 4)).toBe("govuk-!-width-one-quarter");
});

test("it should return override for 3/4", () => {
  expect(widthOverrides(3 / 4)).toBe("govuk-!-width-three-quarters");
});

test("it should return blank for unknown", () => {
  expect(widthOverrides(1 / 5)).toBe("");
});
