export type PersonType = "Tenant" | "Leaseholder" | "Freeholder" | "HouseholdMember";

export enum PersonTitle {
  MR = "Mr",
  MRS = "Mrs",
  MISS = "Miss",
  MS = "Ms",
  DR = "Dr",
  MASTER = "Master",
  RABBI = "Rabbi",
  REVEREND = "Reverend",
  OTHER = "Other",
}

export enum PersonGender {
  M = "M",
  F = "F",
  O = "O",
}

export enum PersonCommunincationRequirements {
  SIGN_LANGUAGE = "SignLanguage",
  INTERPRETER_REQUIRED = "InterpreterRequired",
}

export enum IdentificationTypes {
  PASSPORT = "Passport",
  DRIVING_LICENCE = "DrivingLicence",
  NI = "NI",
}

export interface Identification {
  identificationType: IdentificationTypes;
  value: string;
  isOriginalDocumentSeen: boolean;
}

export interface Language {
  language: string;
  isPrimary: boolean;
}

export interface Person {
  id: string;
  title: PersonTitle;
  firstName: string;
  middleName?: string | null;
  surname: string;
  preferredTitle?: PersonTitle | null;
  preferredFirstName?: string | null;
  preferredMiddleName?: string | null;
  preferredSurname?: string | null;
  placeOfBirth?: string | null;
  dateOfBirth: string;
  personTypes?: PersonType[];
  tenures: TenureSummary[];
  reason: string;
  etag?: string;
}

export interface TenureSummary {
  assetFullAddress: string;
  assetId: string;
  endDate: string | null;
  id: string;
  isActive: boolean;
  paymentReference: string;
  propertyReference: string | null;
  startDate: string;
  type: string;
  uprn: string;
}

export interface PersonSearchResult {
  id: string;
  title: string;
  firstname: string;
  middleName?: string;
  surname: string;
  preferredFirstname: string;
  preferredSurname: string;
  ethinicity: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
  identification: Identification[];
  personTypes?: PersonType[];
  isPersonCautionaryAlert: boolean;
  isTenureCautionaryAlert: boolean;
  tenures: TenureSummary[];
}
