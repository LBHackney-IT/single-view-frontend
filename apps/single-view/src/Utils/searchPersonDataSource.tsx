import { housingSearchPerson } from "../Interfaces";
import { isMergedRecord } from "./isMergedRecord";
import { humanize } from ".";
import { SingleView } from "../Interfaces/dataSources"

export const searchPersonDataSource = (
  person: housingSearchPerson
): string => {
  if (isMergedRecord(person)) {
    var dataSource: string = SingleView;
  } else {
    // Should be only one item in list
    var dataSource: string = person.dataSources[0];
  }
  return humanize(dataSource);
};
