export interface UrlParams {
  id: string;
}

export interface Tenure {
  id: string;
  type: string;
  totalBalance: number;
  startDate: string;
  endDate: string | null;
  assetFullAddress: string;
  postCode: string | null;
  paymentReference: string | null;
  isActive: boolean;
}

export interface Person {
  id: string;
  title: string;
  firstname: string;
  middleName: string | null;
  surname: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  totalBalance: number;
  dateOfBirth: string;
  personTypes: Array<string>; // TODO: Make an enum
  isPersonCautionaryAlert: boolean;
  isTenureCautionaryAlert: boolean;
  tenures: Array<Tenure>;
}
