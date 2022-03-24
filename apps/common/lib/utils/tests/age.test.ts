import { isUnderAge } from "../age";

beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date("2021-12-25"));
});

afterAll(() => {
  jest.useRealTimers();
});

describe("isUnderAge", () => {
  it("returns true as person is under 18", () => {
    expect(isUnderAge("2003-12-26T00:00:00", 18)).toBeTruthy();
  });
  it("returns false as person is 18 today", () => {
    expect(isUnderAge("2003-12-25T00:00:00", 18)).toBeFalsy();
  });
  it("returns false as person is over 18", () => {
    expect(isUnderAge("2003-12-24T00:00:00", 18)).toBeFalsy();
  });
  it("returns true as person is under 16", () => {
    expect(isUnderAge("2005-12-26T00:00:00", 16)).toBeTruthy();
  });
  it("returns true as dob is invalid", () => {
    expect(isUnderAge("invalid-date", 16)).toBeTruthy();
  });
});
