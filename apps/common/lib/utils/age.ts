import { differenceInYears } from "date-fns";

import { parseDate } from "./date-format";

export const isUnderAge = (dob: string, age: number) => {
  const isValidDate = parseDate(dob);
  if (!isValidDate) {
    return true;
  }

  const ageInYears = differenceInYears(new Date(), isValidDate);
  return ageInYears < age;
};
