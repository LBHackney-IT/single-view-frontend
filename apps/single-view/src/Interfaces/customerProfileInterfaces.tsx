import { cautionaryAlert } from "./CautionaryAlertInterfaces";
import { councilTaxAccount, knownAddress, contactDetail } from ".";
import { housingBenefitsAccount } from "./housingBenefitsRecordInterfaces";

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
}
