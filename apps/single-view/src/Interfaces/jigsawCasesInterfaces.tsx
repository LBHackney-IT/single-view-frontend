export interface jigsawCasesResponse {
  currentCase: Case;
  placementInformation: Array<Placement>;
  caseOverview: CaseOverview;
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
  houseHoldComposition: string;
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
