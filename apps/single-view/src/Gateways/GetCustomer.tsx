import axios from "axios";
import { Person } from "../Interfaces";
import { getToken } from "../Utils/getHackneyToken";

export const getCustomer = async (id: string): Promise<Person> => {
  return await axios
    .get(
      `https://tkmpx5yvs2.execute-api.eu-west-2.amazonaws.com/staging/api/v1/persons/${id}`,
      {
        headers: {
          Authorization: `${getToken()}`,
        },
      }
    )
    .then((response) => {
      return response.data.results.person;
    });
};
