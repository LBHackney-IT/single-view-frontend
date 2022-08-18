import {
  housingSearchPerson,
  mapRecordsToMatchedRecord,
  matchedRecord,
} from ".";

describe("mapRecordsToMatchFunction", () => {
  it("accepts search results and returns a merged record", () => {
    const result = mapRecordsToMatchedRecord(mockSearchResults);

    expect(result.matchedRecord).toEqual(expectedMatchedRecord);
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
    dataSources: ["PersonAPI"],
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
        dataSourceName: "PersonAPI",
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
    dataSources: ["Jigsaw"],
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
        dataSourceName: "PersonAPI",
      },
    ],
  },
];

const expectedMatchedRecord: matchedRecord = {
  firstName: "Test",
  lastName: "McTestFace",
  dateOfBirth: "2020-11-15",
  niNumber: "JN8058495C",
  dataSources: [
    {
      dataSource: "PersonAPI",
      sourceId: "test-source-id",
    },
    {
      dataSource: "Jigsaw",
      sourceId: "jigsaw-test-id",
    },
  ],
};
