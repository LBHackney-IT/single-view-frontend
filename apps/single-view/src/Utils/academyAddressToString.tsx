import { councilTaxAddress } from "../Interfaces/councilTaxRecordInterfaces";

export const councilTaxAddressToString = (
  address: councilTaxAddress
): string => {
  return `${address.line1} ${address.line2} ${address.line3} ${address.line4} ${address.postCode}`;
};
