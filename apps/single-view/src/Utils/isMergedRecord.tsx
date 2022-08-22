import { housingSearchPerson } from "../Interfaces";

export function isMergedRecord(person: housingSearchPerson): boolean {
  return person.dataSources.length > 1;
}
