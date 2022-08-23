export interface housingBenefitsAccount {
  claimId: string;
  checkDigit: string;
  personReference: string;
  householdMembers: householdMember[] | null;
  benefits: benefit[] | null;
  weeklyHousingBenefitAmont: number | null;
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
