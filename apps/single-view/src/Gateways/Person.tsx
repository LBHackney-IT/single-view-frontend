import axios from "axios";
import { customerProfile } from "../Interfaces/customerProfileInterfaces";
import { getToken } from "../Utils/getHackneyToken";
import { getCookie } from "../Utils/getCookie";

export const getPerson = async (
  dataSource: string,
  id: string
): Promise<customerProfile | null> => {
  try {
    let response;

    if (dataSource == "PersonAPI") {
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
    return response.data.customer;
  } catch (e) {
    return null;
  }
};
