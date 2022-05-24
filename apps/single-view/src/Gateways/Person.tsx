import axios from "axios";
import { Person } from "../Interfaces/personInterfaces";
import { getToken } from "../Utils/getHackneyToken";
import { getCookie } from "../Utils/getCookie";

export const getPerson = async (
  id: string,
  dataSource: number
): Promise<Person | null> => {
  try {
    let response;

    if (dataSource == 0) {
      response = await axios.get(`${process.env.SV_API_V1}/customers/${id}`, {
        headers: {
          Authorization: `${getToken()}`,
        },
      });
    } else {
      response = await axios.get(
        `${
          process.env.SV_API_V1
        }/getJigsawCustomer?id=${id}&redisId=${getCookie("jigsawToken")}`
      );
    }

    if (response.status != 200) {
      throw new Error("Error retrieving person");
    }

    return response.data;
  } catch (e) {
    return null;
  }
};
