import axios from "axios";
import { customerProfile } from "../Interfaces/customerProfileInterfaces";
import { getToken } from "../Utils/getHackneyToken";
import { getCookie } from "../Utils/getCookie";

export const getPerson = async (
  id: string,
  dataSource: number
): Promise<customerProfile | null> => {
  try {
    let response;

    if (dataSource == 0) {
      response = await axios.get(
        `${process.env.SV_API_V1}/customers?id=${id}`,
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
        }/getJigsawCustomer?id=${id}&redisId=${getCookie("jigsawToken")}`
      );
    }

    if (response.status != 200) {
      throw new Error("Error retrieving person");
    }

    console.log(response);
    return response.data;
  } catch (e) {
    return null;
  }
};
