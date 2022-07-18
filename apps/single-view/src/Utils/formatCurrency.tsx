export const formatCurrency = (value: number): string => {
  let formatter = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return formatter.format(value);
};
