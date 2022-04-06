import { Note } from "../Interfaces/notesInterfaces";

export const sortNotes = (notes: Note[]) => {
  return notes.sort((a, b) => {
    return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
  });
};
