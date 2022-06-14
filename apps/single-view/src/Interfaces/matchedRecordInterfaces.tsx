import { housingSearchPerson } from ".";

export interface matchedRecord {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  ni_number: string | null;
  data_sources: dataSource[];
}

export interface dataSource {
  data_source: string;
  source_id: string;
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
    first_name: personApiResult[0].firstName,
    last_name: personApiResult[0].surName,
    date_of_birth: personApiResult[0].dateOfBirth,
    ni_number: jigsawResult[0]?.niNo,
    data_sources: dataSources,
  };

  return result;
};
