export enum PersonTitle {
  Dr,
  Master,
  Miss,
  Mr,
  Mrs,
  Ms,
  Other,
  Rabbi,
  Reverend,
}

export enum PersonType {
  Tenant,
  HouseholdMember,
  Leaseholder,
  Freeholder,
  Occupant,
}

export interface Person {
  id: string;
  title: string;
  preferredTitle: string | null;
  preferredFirstName: string | null;
  preferredMiddleName: string | null;
  preferredSurname: string | null;
  firstName: string;
  middleName: string | null;
  surname: string;
  placeOfBirth: string;
  dateOfBirth: string;
  personTypes: Array<string>;
  tenures: Array<Tenure>;
  reason: string;
  links: Array<ApiLink>;
  isAMinor: boolean;
  dateOfDeath: string | null;
}

interface Tenure {
  id: string;
  type: string;
  startDate: string;
  endDate: string | null;
  assetFullAddress: string;
  assetId: string;
  uprn: string;
  isActive: boolean;
  paymentReference: string | null;
  propertyReference: string | null;
}

export interface ApiLink {
  href: string;
  rel: string;
  endpointType: string;
}
