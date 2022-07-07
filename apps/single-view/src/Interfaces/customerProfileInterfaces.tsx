import { councilTaxRecord, knownAddress } from ".";

export interface customerProfile {
  id: string;
  title: string | null;
  firstName: string;
  dataSource: string;
  surname: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  dateofDeath: string | null;
  placeOfBirth: string;
  personTypes: string[] | null;
  niNo: string | null;
  nhsNumber: string | null;
  knownAddresses: knownAddress[];
  isAMinor: boolean;
  councilTaxRecord: councilTaxRecord | null;
}
