import { housingSearchPerson } from ".";

export interface matchedRecord {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  niNumber: string | null;
  dataSources: dataSource[];
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
      dataSource: person.dataSource,
      sourceId: person.id,
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
