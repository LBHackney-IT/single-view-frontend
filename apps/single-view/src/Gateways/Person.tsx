import axios from "axios";
import { customerResponse, Housing } from "../Interfaces";
import { getToken } from "../Utils/getHackneyToken";
import { getCookie } from "../Utils/getCookie";

export const getPerson = async (
  dataSource: string,
  id: string
): Promise<customerResponse | null> => {
  try {
    let response;

    if (dataSource == Housing) {
      response = await axios.get(
        `${process.env.SV_API_V1}/getPersonApiCustomer?id=${id}`,
        {
          headers: {
            Authorization: `${getToken()}`,
          },
        }
      );
    } else if (dataSource == "single-view") {
      response = await axios.get(
        `${process.env.SV_API_V1}/customers?id=${id}&redisId=${getCookie(
          "jigsawToken"
        )}`,
        {
          headers: {
            Authorization: `${getToken()}`,
          },
        }
      );
    } else {
      response = await axios.get(
        `${
          process.env.SV_API_V1
        }/getJigsawCustomer?id=${id}&redisId=${getCookie("jigsawToken")}`,
        {
          headers: {
            Authorization: `${getToken()}`,
          },
        }
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
