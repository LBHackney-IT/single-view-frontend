export interface housingBenefitsAccount {
  claimId: string;
  checkDigit: string;
  personReference: string;
  householdMembers: householdMember[] | null;
  benefits: benefit[] | null;
  weeklyHousingBenefitDetails: WeeklyHousingBenefitDetails;
  housingBenefitLandlordDetails: HousingBenefitLandlordDetails | null;
  paymentDetails: PaymentDetails | null;
}

export interface WeeklyHousingBenefitDetails {
  weeklyHousingBenefit: number | null;
  housingBenefitPayee: string | null;
}

export interface PaymentDetails {
  postingDate: string;
  paymentAmount: number;
}

export interface householdMember {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface benefit {
  amount: number;
  description: string;
  period: string;
  frequency: number;
}

export interface HousingBenefitLandlordDetails {
  claimId: string;
  name: string;
  addr1: string;
  addr2: string;
  addr3: string;
  addr4: string;
  postcode: string;
  creditorId: string;
}
