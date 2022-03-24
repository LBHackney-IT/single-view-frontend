export type ContactDetail = {
  id: string;
  targetId: string;
  targetType: ContactDetailTargetTypes;
  contactInformation: ContactInformation;
  sourceServiceArea: SourceServiceArea;
  recordValidUntil: string;
  isActive: boolean;
  createdBy: CreatedBy;
};

export type ContactDetails = {
  results: ContactDetail[];
};

export type ContactInformation = {
  contactType: ContactInformationContactTypes;
  subType?: ContactInformationSubTypes | null;
  value: string;
  description?: string | null;
  addressExtended?: ContactInformationAddressExtended | null;
};

export type SourceServiceArea = {
  area: string;
  isDefault: boolean;
};

export type CreatedBy = {
  createdBy: string;
  id: string;
  fullName: string;
  email: string;
};

export enum ContactDetailTargetTypes {
  PERSON = "person",
  ORGANISATION = "organisation",
}

export enum ContactInformationContactTypes {
  PHONE = "phone",
  EMAIL = "email",
  ADDRESS = "address",
}

export enum ContactDetailsPhoneTypes {
  MOBILE = "mobile",
  HOME = "home",
  WORK = "work",
  OTHER = "other",
}

export enum ContactDetailsAddressTypes {
  CORRESPONDENCE_ADDRESS = "correspondenceAddress",
}

export type ContactInformationSubTypes =
  | ContactDetailsPhoneTypes
  | ContactDetailsAddressTypes;

export type ContactInformationAddressExtended = {
  uprn: string | null;
  isOverseasAddress: boolean;
  overseasAddress: string | null;
  addressLine1: string;
  addressLine2: string | null;
  addressLine3: string | null;
  addressLine4: string | null;
  postCode: string;
};
