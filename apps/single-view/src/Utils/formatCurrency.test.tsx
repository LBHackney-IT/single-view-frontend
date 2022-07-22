import { formatCurrency } from "./formatCurrency";

describe("formatCurrency function", () => {
  it("should display a numeric value as a currency string", () => {
    const stubValue = "£5,587.00";
    const actual = formatCurrency(5587);
    expect(actual).toEqual(stubValue);
  });
});
