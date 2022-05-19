import axios from "axios";
import { Person } from "../Interfaces/personInterfaces";
import { getToken } from "../Utils/getHackneyToken";

export const getPerson = async (id: string): Promise<Person | null> => {
  try {
    const response = await axios.get(
      `${process.env.PERSON_API_V1}/persons/${id}`,
      {
        headers: {
          Authorization: `${getToken()}`,
        },
      }
    );

    if (response.status != 200) {
      throw new Error("Error retrieving person");
    }

    return response.data;
  } catch (e) {
    return null;
  }
};
