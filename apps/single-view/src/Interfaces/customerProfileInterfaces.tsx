import { cautionaryAlert } from "./CautionaryAlertInterfaces";
import { councilTaxAccount, knownAddress, contactDetail } from ".";
import { housingBenefitsAccount } from "./housingBenefitsRecordInterfaces";
import { EqualityData } from "./equalityInformationInterfaces";

export interface customerProfile {
  preferredTitle: string | null;
  id: string;
  title: string | null;
  firstName: string;
  dataSource: string;
  surname: string;
  preferredFirstName: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  pregnancyDueDate: string | null;
  accommodationType: string | null;
  housingCircumstance: string | null;
  isSettled: boolean | null;
  supportWorker: supportWorker | null;
  gender: string | null;
  dateofDeath: string | null;
  placeOfBirth: string;
  personTypes: string[] | null;
  niNo: string | null;
  nhsNumber: string | null;
  cautionaryAlerts: cautionaryAlert[] | null;
  allContactDetails: contactDetail[] | null;
  knownAddresses: knownAddress[] | null;
  isAMinor: boolean;
  councilTaxAccount: councilTaxAccount | null;
  housingBenefitsAccount: housingBenefitsAccount | null;
  equalityInformation: EqualityData | null;
  sharedPlans: sharedPlan[];
}

export interface supportWorker {
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  jobTitle: string | null;
  agency: string | null;
  phoneNumber: string | null;
  emailAddress: string | null;
}

export interface sharedPlan {
  id: string;
}
