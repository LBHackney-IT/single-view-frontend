import { housingSearchPerson } from ".";
import { searchPersonDataSource } from "../Utils/searchPersonDataSource";

export interface matchedRecord {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  niNumber: string | null;
  dataSources: dataSource[];
}

export interface result {
  matchedRecord: matchedRecord | null;
  error: string | null;
}

export interface dataSource {
  dataSource: string;
  sourceId: string;
}

export const mapRecordsToMatchedRecord = (
  persons: housingSearchPerson[]
): result => {
  let masterRecord = persons.find((person) => person.dateOfBirth != null);

  if (masterRecord == null) {
    return {
      error: "Please select at least one person with a date of birth",
      matchedRecord: null,
    };
  }

  let ninoRecord = persons.find((person) => person.niNo != null);

  const dataSources: dataSource[] = [];

  for (let person of persons) {
    let dataSource: dataSource = {
      dataSource: searchPersonDataSource(person),
      sourceId: person.id,
    };
    dataSources.push(dataSource);
  }

  const matchedRecord: matchedRecord = {
    firstName: masterRecord.firstName,
    lastName: masterRecord.surName,
    dateOfBirth: masterRecord.dateOfBirth,
    niNumber: ninoRecord?.niNo || null,
    dataSources: dataSources,
  };
  return { matchedRecord: matchedRecord, error: null };
};
