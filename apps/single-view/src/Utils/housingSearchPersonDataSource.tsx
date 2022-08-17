import { housingSearchPerson } from "../Interfaces";
import { isMergedRecord } from "./isMergedRecord";
import { humanize } from "../Utils";

export const housingSearchPersonDataSource = (person: housingSearchPerson): string => {
  if (isMergedRecord(person)) {
    var dataSource:string = "single-view"
  } else {
    // Should be only one item in list
    var dataSource:string = person.dataSources[0]
  }
  return humanize(dataSource);
};