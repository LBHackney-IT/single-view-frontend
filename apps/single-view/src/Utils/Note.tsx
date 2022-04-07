import { Note } from "../Interfaces/notesInterfaces";

export const noNotesFoundPlaceholder: Array<Note> = [
  {
    id: "",
    title: "",
    description: "There are no notes for the selected customer.",
    targetType: "",
    targetId: "",
    createdAt: String(new Date()),
    categorisation: {
      category: "",
      subCategory: "",
      description: "",
    },
    author: {
      fullName: "",
      email: "",
    },
    highlight: false,
  },
];

export const voidNotes: Array<Note> = [
  {
    id: "",
    title: "",
    description: "",
    targetType: "",
    targetId: "",
    createdAt: String(new Date()),
    categorisation: {
      category: "",
      subCategory: "",
      description: "",
    },
    author: {
      fullName: "",
      email: "",
    },
    highlight: false,
  },
];
