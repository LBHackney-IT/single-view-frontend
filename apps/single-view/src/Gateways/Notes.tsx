import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";

export const getNotes = async (id: string): Promise<any> => {
  const response = await axios.get(`${process.env.NOTES_API_V1}/notes/${id}`, {
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  return response.data;
};
