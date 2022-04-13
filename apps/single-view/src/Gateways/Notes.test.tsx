import { createNote, getNotes } from "./Notes";
import axios from "axios";
import { Note } from "../Interfaces";
jest.mock("axios", () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});

const mockAxios = axios as jest.Mocked<typeof axios>;

describe("Notes API gateway", () => {
  describe("getNotes", () => {
    it("should return an array when the target ID exists", async () => {
      const results: Array<Note> = [];
      const response = { status: 200, data: { results: results } };
      mockAxios.get.mockImplementationOnce(async () => response);

      expect(await getNotes("")).toEqual(results);
    });

    it("should return null on error", async () => {
      const response = { status: 400 };
      mockAxios.get.mockImplementationOnce(async () => response);

      expect(await getNotes("")).toBeNull();
    });
  });

  describe("createNote", () => {
    it("should return a Note object when the target ID exists", async () => {
      const note = {};
      const response = { status: 201, data: {} };
      mockAxios.post.mockImplementationOnce(async () => response);

      expect(await createNote("", note)).toEqual(note);
    });

    it("should return null on error", async () => {
      const response = { status: 400 };
      mockAxios.post.mockImplementationOnce(async () => response);

      expect(await createNote("", {})).toBeNull();
    });
  });
});
