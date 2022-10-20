import { housingSearchPerson } from "../Interfaces";
import { humanize } from ".";

export const searchPersonDataSource = (person: housingSearchPerson): string => {
  let dataSource: string;
  if (person.isMergedSingleViewRecord) {
    dataSource = "single-view";
  } else {
    // Should be only one item in list
    dataSource = person.dataSources[0];
  }
  return humanize(dataSource);
};
