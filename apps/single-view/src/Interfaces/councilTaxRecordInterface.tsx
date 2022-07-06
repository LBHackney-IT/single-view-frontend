import { add } from "date-fns";

export interface councilTaxRecord {
  accountRef: string;
  accountCheckDigit: string;
  paymentMethod: string;
  accountBalance: number;
  propertyAddress: string;
  forwardingAddress: string | null;
}

export interface councilTaxAddress {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  postCode: string;
}

export const councilTaxAddressToString = (
  address: councilTaxAddress
): string => {
  return `${address.line1} ${address.line2} ${address.line3} ${address.line4} ${address.postCode}`;
};
