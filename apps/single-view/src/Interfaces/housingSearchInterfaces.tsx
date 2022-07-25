import { NullLiteral } from "@babel/types";

export interface housingSearchPerson {
  id: string;
  title: string;
  firstName: string;
  dataSource: string;
  middleName: string | null;
  surName: string;
  preferredFirstname: string | null;
  preferredSurname: string | null;
  dateOfBirth: string;
  personTypes: string[] | null;
  niNo: string | null;
  IsPersonCautionaryAlerted: boolean;
  IsTenureCautionaryAlerted: boolean;
  knownAddresses: knownAddress[];
  isSelected: boolean;
}

export interface knownAddress {
  fullAddress: string;
  id: string;
  currentAddress: boolean;
  startDate: string;
  endDate: string | null;
  dataSourceName: string;
}

/* From API response in frontend
{
  "id": "00000000-0000-0000-0000-000000000000",
  "targetId": "00000000-0000-0000-0000-000000000000",
  "targetType": 0,
  "contactInformation": null,
  "sourceServiceArea": null,
  "recordValidUntil": null,
  "isActive": false,
  "createdBy": null,
  "lastModified": null
}
*/

export interface contactDetail {
  id: string;
  targetId: string;
  targetType: number;
  contactInformation: Array<object> | null; // CHECK! Somehow?
  sourceServiceArea: string | null;
  recordValidUntil: string | null;
  isActive: boolean;
  createdBy: string | null;
  lastModified: string | null;
}