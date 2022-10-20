export interface housingSearchPerson {
  id: string;
  title: string;
  firstName: string;
  dataSources: string[];
  middleName: string | null;
  surName: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  personTypes: string[] | null;
  niNumber: string | null;
  IsPersonCautionaryAlerted: boolean;
  IsTenureCautionaryAlerted: boolean;
  isMergedSingleViewRecord: boolean;
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
  householdMembers: householdMember[] | null;
  legacyReferences: legacyReference[] | null;
}

export interface legacyReference {
  name: string | null;
  value: string | null;
}

export interface householdMember {
  id: string;
  fullName: string;
  isResponsible: boolean;
  dateOfBirth: string;
}

export interface contactDetail {
  addressExtended: object | null;
  contactType: string;
  dataSourceName: string;
  description: string | null;
  isActive: boolean;
  sourceServiceArea: string;
  subType: string | null;
  value: string;
}

export interface sourceServiceArea {
  area: string;
  isDefault: boolean;
}

export interface housingSearchResults {
  matchedResults: housingSearchPerson[];
  otherResults: housingSearchPerson[];
}
