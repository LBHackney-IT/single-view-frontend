import { authoriseJigsaw, authoriseJigsawError } from "./Jigsaw";
import axios from "axios";
jest.mock("axios", () => {
  return {
    post: jest.fn(),
  };
});

const mockAxios = axios as jest.Mocked<typeof axios>;

describe("Jigsaw gateway", () => {
  describe("authoriseJigsaw", () => {
    it("should return a string if the request is OK", async () => {
      const token: string = "Placeholder-Jigsaw-Token";
      const response = { status: 200, data: token };
      mockAxios.post.mockImplementationOnce(async () => response);

      expect(await authoriseJigsaw("", "")).toEqual(token);
    });

    it("should throw an error if the request is not OK", async () => {
      const response = { status: 401 };
      mockAxios.post.mockImplementationOnce(async () => response);

      try {
        await authoriseJigsaw("", "");
      } catch (e: any) {
        expect(e.message).toBe(authoriseJigsawError.message);
      }
    });
  });
});
