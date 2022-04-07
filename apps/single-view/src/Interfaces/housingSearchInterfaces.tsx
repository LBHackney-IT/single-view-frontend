export interface housingSearchPerson {
  id: string;
  title: string;
  firstname: string;
  middleName: string | null;
  surname: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  totalBalance: number;
  personTypes: string[];
  IsPersonCautionaryAlerted: boolean;
  IsTenureCautionaryAlerted: boolean;
  tenures: Tenure[];
}

export interface Tenure {
  id: string;
  type: string;
  startDate: string;
  endDate: string | null;
  assetFullAddress: string;
  totalBalance: number;
  postCode: string | null;
  paymentReference: string | null;
  isActive: true;
}
