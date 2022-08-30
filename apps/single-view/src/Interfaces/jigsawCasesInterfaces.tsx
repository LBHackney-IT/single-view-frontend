export interface jigsawCasesResponse {
  currentCase: Case;
  placementInformation: Array<Placement>;
  caseOverview: CaseOverview;
  additionalFactors: Array<AdditionalInfo>;
  healthAndWellBeing: Array<AdditionalInfo>;
}

export interface Case {
  id: string;
  statusName: string;
  dateOfApproach: string;
  isCurrent: boolean;
  assignedTo: string | null;
  isV2LegacyCase: boolean;
}

export interface CaseOverview {
  id: string;
  currentFlowchartPosition: string;
  currentDecision: string;
  householdComposition: Array<HouseHoldComposition>;
}

export interface HouseHoldComposition {
  name: string;
  dateOfBirth: string | null;
  gender: string | null;
  niNumber: string | null;
  nhsNumber: string | null;
}

export interface Placement {
  placementType: string;
  fullAddressDetails: FullAddressDetails;
  placementDuty: string;
  placementDutyFullName: string;
  usage: string;
  dclgClassificationType: string;
}

export interface FullAddressDetails {
  id: string;
  houseName: string | null;
  houseNumber: string | null;
  street: string | null;
  town: string | null;
  county: string | null;
  postcode: string;
  apartment: string | null;
  roomNumber: string | null;
  locality: string | null;
  latitude: string | null;
  freetext: string | null;
}

export interface Info {
  question: string;
  answer: string;
}

export interface AdditionalInfo {
  legend: string;
  info: Array<Info>;
}
