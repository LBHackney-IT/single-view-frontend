export interface Person {
  id: string;
  title: string;
  firstname: string;
  middleName: string;
  surname: string;
  preferredFirstname: string;
  preferredSurname: string;
  dateOfBirth: string;
  totalBalance: number;
  personTypes: string[];
  IsPersonCautionaryAlerted: boolean;
  IsTenureCautionaryAlerted: boolean;
  tenures: Tenure[];
}

interface Tenure {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  assetFullAddress: string;
  totalBalance: number;
  postCode: string;
  paymentReference: string;
  isActive: true;
}
