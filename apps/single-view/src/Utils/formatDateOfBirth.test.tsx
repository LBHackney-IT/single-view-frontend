import { formatDateOfBirth } from "./formatDateOfBirth";

describe("formatDateOfBirth function", () => {
  it("should display a person's date of birth in the format, DD/MM/YYYY", () => {
    expect("01/12/1990").toEqual(formatDateOfBirth("1990-12-01"));
  });
});
