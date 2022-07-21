import { FullAddressDetails } from "../Interfaces";

export const jigsawAddressToString = (
  address: FullAddressDetails | null | undefined
): string | null => {
  if (!address) return null;
  return [
    address.roomNumber,
    address.houseName,
    address.houseNumber,
    address.street,
    address.street,
    address.town,
    address.postcode,
    address.county,
  ].join(", ");
};
