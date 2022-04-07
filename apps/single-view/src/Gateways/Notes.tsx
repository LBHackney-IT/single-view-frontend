import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { Note } from "../Interfaces";

export const getNotes = async (id: string): Promise<Note[]> => {
  const response = await axios.get(
    `${process.env.NOTES_API_V2}/notes?targetId=${id}`,
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    }
  );

  if (response.status > 400) {
    //do something
  }

  return response.data.results;
};
