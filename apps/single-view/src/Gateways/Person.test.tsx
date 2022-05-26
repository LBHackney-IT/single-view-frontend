import { getPerson } from "./Person";
import axios from "axios";
jest.mock("axios", () => {
  return {
    get: jest.fn(),
  };
});

const mockAxios = axios as jest.Mocked<typeof axios>;

describe("Person API gateway", () => {
  describe("getPerson", () => {
    it("should return null on error", async () => {
      const response = { status: 404 };
      mockAxios.get.mockImplementationOnce(async () => response);

      expect(await getPerson(0, "")).toBeNull();
    });
  });
});
