import { mergeRecords, mergeError } from "./mergeRecords";
import axios from "axios";
import { matchedRecord, dataSource } from "../Interfaces";
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
      const response = { status: 200, data: sv_id };
      mockAxios.post.mockImplementationOnce(async () => response);
      expect(await mergeRecords(mockMatchedRecord)).toEqual(sv_id);
    });
    it("should throw an error if the request is not OK", async () => {
      const response = { status: 401 };
      mockAxios.post.mockImplementationOnce(async () => response);

      try {
        await mergeRecords(mockMatchedRecord);
      } catch (e: any) {
        expect(e.message).toBe(mergeError.message);
      }
    });
  });
});

const mockMatchedRecord: matchedRecord = {
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
