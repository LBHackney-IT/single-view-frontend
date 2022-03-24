import { AssetType } from "../../asset/v1/types";
import { PersonType } from "../../person/v1/types";

export interface TenureDetailsProperties {
  title: string;
}

export interface TenureType {
  code: string;
  description: string;
}

export interface HouseholdMember {
  id: string;
  type: string;
  fullName: string;
  isResponsible: boolean;
  dateOfBirth: string;
  personTenureType?: PersonType;
}

export interface TenureAsset {
  id: string;
  type: AssetType;
  fullAddress: string;
  uprn: string;
  propertyReference: string | null;
}

export interface AccountType {
  code: string;
  description: string;
}

export interface Charges {
  rent: number;
  currentBalance: number;
  billingFrequency: string;
  paymentReference: string;
  rentGroupCode: string;
  rentGroupDescription: string;
  serviceCharge: number;
  otherCharges: number;
  combinedServiceCharges: number;
  combinedRentCharges: number;
  tenancyInsuranceCharge: number;
  originalRentCharge: number;
  originalServiceCharge: number;
}

export interface AgreementType {
  code: string;
  description: string;
}

export interface NoticeType {
  type: string;
  servedDate: string;
  expiryDate: string;
  endDate: string;
  effectiveDate: string;
}

export interface LegacyReference {
  name: string;
  value: string;
}

export interface Tenure {
  id: string;
  tenuredAsset: TenureAsset;
  startOfTenureDate: string;
  endOfTenureDate: string | null;
  tenureType: TenureType;
  isActive: boolean;
  accountType: AccountType;
  paymentReference: string;
  householdMembers: HouseholdMember[];
  charges: Charges;
  isTenanted: boolean | null;
  terminated: {
    isTerminated: boolean;
    reasonForTermination: string;
  };
  successionDate: string;
  agreementType: AgreementType;
  subsidiaryAccountsReferences: string[];
  masterAccountTenureReference: string;
  evictionDate: string;
  potentialEndDate: string;
  notices: NoticeType[];
  legacyReferences: LegacyReference[];
  rentCostCentre: string;
  isMutualExchange: boolean;
  informHousingBenefitsForChanges: boolean;
  isSublet: boolean;
  subletEndDate: string;
  etag?: string;
}

export type FetchState = "loading" | "error" | "invalid" | "done";
