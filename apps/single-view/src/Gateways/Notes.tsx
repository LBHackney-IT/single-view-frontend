import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { Note, Person } from "../Interfaces";
import { $auth } from "@mfe/common/lib/auth";

export const getNotes = async (id: string): Promise<Note[] | null> => {
  try {
    const response = await axios.get(
      `${process.env.NOTES_API_V2}/notes?targetId=${id}`,
      {
        headers: {
          Authorization: `${getToken()}`,
        },
      }
    );

    if (response.status != 200) {
      throw new Error("Error retrieving notes");
    }

    return response.data.results;
  } catch (e) {
    return null;
  }
};

export const loadPersonNotes = async (
  person: Person,
  collatedNotes: Note[]
): Promise<Person> => {
  let result = await getNotes(person.id);

  if (result) {
    collatedNotes.push(...result);
  }
  return person;
};

export const loadTenureNotes = async (
  person: Person,
  collatedNotes: Note[]
): Promise<void> => {
  if (person.tenures) {
    for (const tenure of person.tenures) {
      let notes = await getNotes(tenure.id);
      if (notes) collatedNotes.push(...notes);
    }
  }
};

export const createNote = async (
  targetId: string,
  data: any
): Promise<Note | null> => {
  let auth = $auth.getValue();
  let note: Note = Object.assign(
    {
      id: "",
      targetId: targetId,
      highlight: false,
      title: null,
      description: "",
      createdAt: new Date().toISOString(),
      categorisation: {
        category: "",
        subCategory: "",
        description: "",
      },
      targetType: "person",
      author: {
        fullName: auth.name,
        email: auth.email,
      },
    },
    data
  );

  try {
    const response = await axios.post(
      `${process.env.NOTES_API_V2}/notes`,
      note,
      {
        headers: {
          Authorization: `${getToken()}`,
        },
      }
    );

    if (response.status != 201) {
      throw new Error("Error creating note");
    }

    return response.data;
  } catch (e) {
    return null;
  }
};
