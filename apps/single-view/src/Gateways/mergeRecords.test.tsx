import { mergeRecords, mergeError } from "./mergeRecords";
import axios from "axios";
import { housingSearchPerson } from "../Interfaces";
jest.mock("axios", () => {
  return {
    post: jest.fn(),
  };
});

const mockAxios = axios as jest.Mocked<typeof axios>;

describe("MergeRecords Gateway", () => {
  describe("mergeRecords", () => {
    it("should return an id string if the request is ok", async () => {
      const sv_id: string = "test-id";
      const selectedRecords: housingSearchPerson[] = mockSearchResults;
      const response = { status: 200, data: sv_id };
      mockAxios.post.mockImplementationOnce(async () => response);
      expect(await mergeRecords(selectedRecords)).toEqual(sv_id);
    });
    it("should throw an error if the request is not OK", async () => {
      const selectedRecords: housingSearchPerson[] = mockSearchResults;
      const response = { status: 401 };
      mockAxios.post.mockImplementationOnce(async () => response);

      try {
        await mergeRecords(selectedRecords);
      } catch (e: any) {
        expect(e.message).toBe(mergeError.message);
      }
    });
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
        dataSourceName: "PersonAPI",
      },
    ],
  },
];
