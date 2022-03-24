import { formatDate, formatTime, isFutureDate } from "./date-format";

test("formats the date correctly", () => {
  expect(formatDate("2021-01-01")).toBe("01/01/2021");
});

test("formatted date treats 1900-01-01 as null", () => {
  expect(formatDate("1900-01-01")).toBe("");
});

test("formatted date will not break with a malformed date string", () => {
  expect(formatDate("hello")).toBe("");
});

test("formatted date will not break with a null date value", () => {
  expect(formatDate(null)).toBe("");
});

test("is future date", () => {
  expect(isFutureDate("1900-01-01")).toBe(true);
  expect(isFutureDate(null)).toBe(true);
  expect(isFutureDate("2100-01-02")).toBe(true);
});

test("formats the time correctly", () => {
  expect(formatTime("2021-10-06T11:36:25.805Z")).toBe("11:36:25");
});

test("formatted time will not break with a malformed date string", () => {
  expect(formatTime("hello")).toBe("");
});

test("formatted time will not break with a null date value", () => {
  expect(formatTime(null)).toBe("");
});
