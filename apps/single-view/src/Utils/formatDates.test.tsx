import { formatDateOfBirth, formatDate } from "./formatDates";

describe("formatDateOfBirth function", () => {
  it("should display a person's date of birth in the format, DD/MM/YYYY", () => {
    const resultwithTime = formatDateOfBirth("1980-02-01T00:00:00Z");
    const resultwithoutTime = formatDateOfBirth("1990-12-01");

    expect(resultwithoutTime).toEqual("01/12/1990");
    expect(resultwithTime).toEqual("01/02/1980");
  });

  it("should return undefined if no date of birth is given", () => {
    const result = formatDateOfBirth("");
    expect(result).toEqual("undefined");
  });
});

describe("formatDate function", () => {
  it("should format the date as dd/mm/yyyy hh:mm when passed an ISO timestamp", () => {
    const inputTimestamp = "2022-04-05T15:12:00";
    const expected = "05/04/2022 15:12";
    const result = formatDate(inputTimestamp);

    expect(result).toEqual(expected);
  });
});
