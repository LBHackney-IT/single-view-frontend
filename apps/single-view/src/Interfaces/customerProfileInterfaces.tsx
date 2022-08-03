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
  accommodationTypeId: string | null;
  housingCircumstanceId: string | null;
  isSettled: boolean | null;
  supportWorker: string | null;
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
}
