import { cautionaryAlert } from "./CautionaryAlertInterfaces";
import { councilTaxAccount, knownAddress } from ".";
import { housingBenefitsAccount } from "./housingBenefitsRecordInterfaces";

export interface customerProfile {
  id: string;
  title: string | null;
  firstName: string;
  dataSource: string;
  surname: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  dateofDeath: string | null;
  placeOfBirth: string;
  personTypes: string[] | null;
  niNo: string | null;
  nhsNumber: string | null;
  cautionaryAlerts: cautionaryAlert[] | null;
  knownAddresses: knownAddress[] | null;
  isAMinor: boolean;
  councilTaxAccount: councilTaxAccount | null;
  housingBenefitsAccount: housingBenefitsAccount | null;
}
