import { housingSearchPerson } from ".";

export interface matchedRecord {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  ni_number: string | null;
  data_sources: dataSource[];
}

export interface dataSource {
  dataSource: string;
  sourceId: string;
}

export const mapRecordsToMatchedRecord = (
  persons: housingSearchPerson[]
): matchedRecord => {
  let personApiResult = persons.filter(
    (person) => person.dataSource == "PersonAPI"
  );
  let jigsawResult = persons.filter((person) => person.dataSource == "Jigsaw");

  const dataSources: dataSource[] = [];

  for (let person of persons) {
    let dataSource: dataSource = {
      data_source: person.dataSource,
      source_id: person.id,
    };
    dataSources.push(dataSource);
  }

  const result: matchedRecord = {
    firstName: personApiResult[0].firstName,
    lastName: personApiResult[0].surName,
    dateOfBirth: personApiResult[0].dateOfBirth,
    niNumber: jigsawResult[0]?.niNo,
    dataSources: dataSources,
  };

  return result;
};
