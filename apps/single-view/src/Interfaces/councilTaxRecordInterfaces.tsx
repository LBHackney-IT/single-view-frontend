export interface councilTaxAccount {
  accountReference: string;
  accountCheckDigit: string;
  paymentMethod: string;
  accountBalance: number;
  propertyAddress: councilTaxAddress;
  forwardingAddress: councilTaxAddress | null;
}

export interface councilTaxAddress {
  addressline1: string;
  addressline2: string;
  addressline3: string;
  addressline4: string | null;
  postcode: string;
}
