import axios from "axios";
import { jigsawCasesResponse } from "../Interfaces/jigsawCasesInterfaces";
import { getCasesByCustomerId, getCasesError } from "./JigsawCases";

jest.mock("axios", () => {
  return {
    get: jest.fn(),
  };
});

const mockAxios = axios as jest.Mocked<typeof axios>;

describe("getCasesByCustomerId", () => {
  it("should thrown an error if the request is not ok", async () => {
    const response = { status: 500 };
    mockAxios.get.mockImplementationOnce(async () => response);

    try {
      await getCasesByCustomerId("test-id", "");
    } catch (e: any) {
      expect(e.message).toBe(getCasesError.message);
    }
  });
});
