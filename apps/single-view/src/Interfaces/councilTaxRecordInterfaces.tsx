export interface councilTaxRecord {
  accountRef: string;
  accountCheckDigit: string;
  paymentMethod: string;
  accountBalance: number;
  propertyAddress: councilTaxAddress;
  forwardingAddress: councilTaxAddress | null;
}

export interface councilTaxAddress {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  postCode: string;
}
