import { housingSearchPerson } from "../Interfaces";
import { isMergedRecord } from "./isMergedRecord";

export const housingSearchPersonToUrl = (person: housingSearchPerson): string => {
  if (isMergedRecord(person)) {
    var href=`/customers/single-view/${person.id}`
  } else {
    // Should be only one item in list
    var href=`/customers/${person.dataSources[0]}/${person.id}`
  }
  return href;
};