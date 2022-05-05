export interface housingSearchPerson {
  id: string;
  title: string;
  firstName: string;
  middleName: string | null;
  surName: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  personTypes: string[];
  IsPersonCautionaryAlerted: boolean;
  IsTenureCautionaryAlerted: boolean;
  knownAddresses: knownAddress[];
}

export interface knownAddress {
  fullAddress: string;
  id: string;
  currentAddress: boolean;
  startDate: string;
  endDate: string | null;
}
