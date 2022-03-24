export interface Gender {
  genderValue: string | null;
  genderValueIfOther: string | null;
  genderDifferentToBirthSex: string | null;
}

export interface Ethnicity {
  ethnicGroupValue: string | null;
  ethnicGroupValueIfOther: string | null;
}

export interface ReligionOrBelief {
  religionOrBeliefValue: string | null;
  religionOrBeliefValueIfOther: string | null;
}

export interface SexualOrientation {
  sexualOrientationValue: string | null;
  sexualOrientationValueIfOther: string | null;
}

export interface MarriageOrCivilPartnership {
  married: string | null;
  civilPartnership: string | null;
}

export interface PregnancyOrMaternity {
  pregnancyDate: string | null;
  pregnancyValidUntil: string | null;
}

export interface Languages {
  language: string | null;
  isPrimary: boolean | null;
}

export interface CaringResponsibilities {
  provideUnpaidCare: string | null;
  hoursSpentProvidingUnpaidCare: string | null;
}

export interface EconomicSituation {
  economicSituationValue: string | null;
  economicSituationValueIfOther: string | null;
}

export interface HomeSituation {
  homeSituationValue: string | null;
  homeSituationValueIfOther: string | null;
}

export interface EqualityData {
  id: string;
  targetId: string;
  ageGroup: string | null;
  gender: Gender | null;
  nationality: string | null;
  ethnicity: Ethnicity | null;
  religionOrBelief: ReligionOrBelief | null;
  sexualOrientation: SexualOrientation | null;
  marriageOrCivilPartnership: MarriageOrCivilPartnership | null;
  pregnancyOrMaternity: PregnancyOrMaternity[] | null;
  nationalInsuranceNumber: string | null;
  languages: Languages[] | null;
  caringResponsibilities: CaringResponsibilities | null;
  disabled: string | null;
  communicationRequirements: string[];
  economicSituation: EconomicSituation | null;
  homeSituation: HomeSituation | null;
  armedForces: string | null;
  etag?: string;
}
