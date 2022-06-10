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
      const selectedRecords: housingSearchPerson[] = [];
      const response = { status: 201, data: sv_id };
      mockAxios.post.mockImplementationOnce(async () => response);
      expect(await mergeRecords(selectedRecords)).toEqual(sv_id);
    });
    it("should throw an error if the request is not OK", async () => {
      const selectedRecords: housingSearchPerson[] = [];
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
