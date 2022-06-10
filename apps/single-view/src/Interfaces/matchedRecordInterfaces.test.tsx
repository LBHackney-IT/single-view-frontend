import {
  housingSearchPerson,
  mapRecordsToMatchedRecord,
  matchedRecord,
} from ".";

describe("mapRecordsToMatchFunction", () => {
  it("accepts search results and returns a merged record", () => {
    const result = mapRecordsToMatchedRecord(mockSearchResults);

    expect(result).toEqual(expectedMatchedRecord);
  });
});

const mockSearchResults: housingSearchPerson[] = [
  {
    id: "test-source-id",
    title: "Mr",
    firstName: "Test",
    middleName: null,
    preferredFirstname: null,
    preferredSurname: null,
    personTypes: null,
    dataSource: "PersonAPI",
    surName: "McTestFace",
    niNo: null,
    dateOfBirth: "2020-11-15",
    IsPersonCautionaryAlerted: false,
    IsTenureCautionaryAlerted: false,
    isSelected: true,
    knownAddresses: [
      {
        fullAddress: "Test Face Lane, N1 8TQ",
        id: "12454",
        currentAddress: true,
        startDate: "2021-05-05",
        endDate: null,
      },
    ],
  },
  {
    id: "jigsaw-test-id",
    title: "Mr",
    firstName: "Testy",
    middleName: null,
    preferredFirstname: null,
    preferredSurname: null,
    personTypes: null,
    dataSource: "Jigsaw",
    surName: "McTestFace",
    niNo: "JN8058495C",
    dateOfBirth: "2020-11-15",
    IsPersonCautionaryAlerted: false,
    IsTenureCautionaryAlerted: false,
    isSelected: true,
    knownAddresses: [
      {
        fullAddress: "Test Face Lane, N1 8TQ",
        id: "12454",
        currentAddress: true,
        startDate: "2021-05-05",
        endDate: null,
      },
    ],
  },
];

const expectedMatchedRecord: matchedRecord = {
  first_name: "Test",
  last_name: "McTestFace",
  date_of_birth: "2020-11-15",
  ni_number: "JN8058495C",
  data_sources: [
    {
      data_source: "PersonAPI",
      source_id: "test-source-id",
    },
    {
      data_source: "Jigsaw",
      source_id: "jigsaw-test-id",
    },
  ],
};
