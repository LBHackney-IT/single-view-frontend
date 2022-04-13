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
    it("should return a Person object if the ID exists", async () => {
      const person = {};
      const response = { status: 200, data: person };
      mockAxios.get.mockImplementationOnce(async () => response);

      expect(await getPerson("")).toEqual(person);
    });

    it("should return null on error", async () => {
      const response = { status: 404 };
      mockAxios.get.mockImplementationOnce(async () => response);

      expect(await getPerson("")).toBeNull();
    });
  });
});
