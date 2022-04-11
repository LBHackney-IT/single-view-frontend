import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { Person, Note } from "../Interfaces";

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
