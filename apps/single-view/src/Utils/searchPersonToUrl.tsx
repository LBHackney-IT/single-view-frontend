import { housingSearchPerson } from "../Interfaces";

export const searchPersonToUrl = (person: housingSearchPerson): string => {
  let href: string;
  if (person.isMergedSingleViewRecord) {
    href = `/customers/single-view/${person.id}`;
  } else {
    // Should be only one item in list
    href = `/customers/${person.dataSources[0]}/${person.id}`;
  }
  return href;
};
