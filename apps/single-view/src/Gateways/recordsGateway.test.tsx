import { mergeRecords, mergeError, unmergeRecords } from "./recordsGateway";
import axios from "axios";
import { matchedRecord } from "../Interfaces";
jest.mock("axios", () => {
  return {
    post: jest.fn(),
    delete: jest.fn(),
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

describe("UnmergeRecords Gateway", () => {
  it("should return true if the record is deleted", async () => {
    const sv_id: string = "test-id";
    const response = { status: 204, data: true };
    mockAxios.delete.mockImplementationOnce(async () => response);
    expect(await unmergeRecords(sv_id)).toEqual(true);
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
