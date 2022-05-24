export interface customerProfile {
  id: string;
  title: string | null;
  firstName: string;
  dataSource: string;
  middleName: string | null;
  surName: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  dateofDeath: string | null;
  placeOfBirth: string;
  personTypes: string[] | null;
  nino: string | null;
  knownAddresses: knownAddress[];
  isAMinor: boolean;
}

export interface knownAddress {
  fullAddress: string;
  id: string;
  currentAddress: boolean;
  startDate: string;
  endDate: string | null;
}
