export interface housingSearchPerson {
  id: string;
  title: string;
  firstName: string;
  dataSource: string;
  middleName: string | null;
  surName: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  personTypes: string[] | null;
  niNo: string | null;
  IsPersonCautionaryAlerted: boolean;
  IsTenureCautionaryAlerted: boolean;
  knownAddresses: knownAddress[];
  isSelected: boolean;
}

export interface knownAddress {
  fullAddress: string;
  id: string;
  currentAddress: boolean;
  startDate: string;
  endDate: string | null;
  dataSourceName: string;
}
