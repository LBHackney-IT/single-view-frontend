import { createNote, getNotes, getNotesError, createNoteError } from "./Notes";
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
    it("should return an array if the request is OK", async () => {
      const notes: Array<Note> = [];
      const response = { status: 200, data: { notes: notes } };
      mockAxios.get.mockImplementationOnce(async () => response);

      expect(await getNotes([])).toEqual(notes);
    });

    it("should throw an error if the request is not OK", async () => {
      const response = { status: 500 };
      mockAxios.get.mockImplementationOnce(async () => response);

      try {
        const notes = await getNotes([]);
      } catch (e: any) {
        expect(e.message).toBe(getNotesError.message);
      }
    });
  });

  describe("createNote", () => {
    it("should return a Note object if the request is OK", async () => {
      const note = {};
      const response = { status: 201, data: {} };
      mockAxios.post.mockImplementationOnce(async () => response);

      expect(await createNote("", note)).toEqual(note);
    });

    it("should throw an error if the request is not OK", async () => {
      const response = { status: 500 };
      mockAxios.post.mockImplementationOnce(async () => response);

      try {
        await createNote("", {});
      } catch (e: any) {
        expect(e.message).toBe(createNoteError.message);
      }
    });
  });
});
