import { councilTaxAddress } from "../Interfaces/councilTaxRecordInterfaces";

export const councilTaxAddressToString = (
  address: councilTaxAddress | null | undefined
): string | null => {
  if (!address) return null;
  return [
    address.addressline1,
    address.addressline2,
    address.addressline3,
    address.addressline4,
    address.postcode,
  ].join(" ");
};
