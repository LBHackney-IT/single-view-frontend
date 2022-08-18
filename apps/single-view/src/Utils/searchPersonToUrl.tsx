import { housingSearchPerson } from "../Interfaces";
import { isMergedRecord } from "./isMergedRecord";
import { SingleView } from "../Interfaces/dataSources";

export const searchPersonToUrl = (
  person: housingSearchPerson
): string => {
  if (isMergedRecord(person)) {
    var href = `/customers/${SingleView}/${person.id}`;
  } else {
    // Should be only one item in list
    var href = `/customers/${person.dataSources[0].toLowerCase()}/${person.id}`;
  }
  return href;
};
