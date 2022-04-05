import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { Note } from "../Interfaces";

export const getNotes = async (id: string): Promise<Note[]> => {
  const response = await axios.get(`${process.env.NOTES_API_V1}/notes/${id}`, {
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  return response.data;
};
