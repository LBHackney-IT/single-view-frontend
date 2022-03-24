import { isAfter, parseISO } from "date-fns";

import { TenureSummary } from "../../types";

export const sortTenuresByActive = (tenures: TenureSummary[]): TenureSummary[] => {
  return tenures.sort((a, b) => {
    if (a.isActive && !b.isActive) {
      return -1;
    }

    if (!a.isActive && b.isActive) {
      return 1;
    }

    if (a.type === "Secure" && b.type !== "Secure") {
      return -1;
    }

    if (a.type !== "Secure" && b.type === "Secure") {
      return 1;
    }

    if (a.startDate === b.startDate) {
      return 0;
    }

    return isAfter(parseISO(a.startDate), parseISO(b.startDate)) ? -1 : 1;
  });
};
