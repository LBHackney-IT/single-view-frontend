import { TenureSummary } from "../../types";
import { sortTenuresByActive } from "./sort-tenures-by-active";

const generateTenure = (props: Partial<TenureSummary>) => ({
  assetFullAddress: "1 street name",
  assetId: "1",
  id: "1",
  isActive: true,
  paymentReference: "1",
  propertyReference: "1",
  startDate: "2020-01-01",
  endDate: "2030-01-01",
  type: "Secure",
  uprn: "1",
  ...props,
});

test("it sorts tenures by active", () => {
  const tenure1 = generateTenure({ isActive: false, assetId: "tenure1" });
  const tenure2 = generateTenure({ assetId: "tenure2" });
  const tenure3 = generateTenure({
    assetId: "tenure3",
    startDate: "2021-01-01",
  });

  expect(sortTenuresByActive([tenure1, tenure2, tenure3])).toStrictEqual([
    tenure3,
    tenure2,
    tenure1,
  ]);
});

test("it sorts tenures by active and Secure", () => {
  const tenure1 = generateTenure({
    assetId: "tenure1",
    startDate: "2019-01-01",
  });
  const tenure2 = generateTenure({ assetId: "tenure2", type: "Freehold" });
  const tenure3 = generateTenure({ assetId: "tenure3" });
  const tenure4 = generateTenure({
    assetId: "tenure4",
    isActive: false,
  });
  const tenure5 = generateTenure({ assetId: "tenure5" });

  expect(
    sortTenuresByActive([tenure1, tenure2, tenure3, tenure4, tenure5]),
  ).toStrictEqual([tenure3, tenure5, tenure1, tenure2, tenure4]);
});

test("it sorts tenures by startDate with multiple inactive", () => {
  const tenure1 = generateTenure({
    assetId: "tenure1",
    startDate: "2019-01-01",
    isActive: false,
  });
  const tenure2 = generateTenure({
    assetId: "tenure2",
    isActive: false,
    startDate: "1980-01-01",
  });
  const tenure3 = generateTenure({
    assetId: "tenure3",
    isActive: false,
    startDate: "1990-01-01",
  });
  const tenure4 = generateTenure({
    assetId: "tenure4",
    isActive: false,
    startDate: "2000-01-01",
  });
  const tenure5 = generateTenure({ assetId: "tenure5" });

  expect(
    sortTenuresByActive([tenure1, tenure2, tenure3, tenure4, tenure5]),
  ).toStrictEqual([tenure5, tenure1, tenure4, tenure3, tenure2]);
});
