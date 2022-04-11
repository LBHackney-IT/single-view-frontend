import axios from "axios";
import { Person } from "../Interfaces/personInterfaces";
import { getToken } from "../Utils/getHackneyToken";

export const getPerson = async (id: string): Promise<Person> => {
  const response = await axios.get(
    `${process.env.PERSON_API_V1}/persons/${id}`,
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    }
  );

  return response.data;
};
