import axios from "axios";
import {
  AcademyCT,
  customerResponse,
  Housing,
  Jigsaw,
  SingleView,
} from "../Interfaces";
import { getToken } from "../Utils/getHackneyToken";
import { getCookie } from "../Utils/getCookie";

export const getPerson = async (
  dataSource: string,
  id: string
): Promise<customerResponse | null> => {
  try {
    let response;

    switch (dataSource) {
      case Housing:
        response = await axios.get(
          `${process.env.SV_API_V1}/getPersonApiCustomer?id=${id}`,
          {
            headers: {
              Authorization: `${getToken()}`,
            },
          }
        );
        break;
      case SingleView:
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
        break;
      case AcademyCT:
        response = await axios.get(
          `${process.env.SV_API_V1}/council-tax?id=${id}`,
          {
            headers: {
              Authorization: `${getToken()}`,
            },
          }
        );
        break;
      case Jigsaw:
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
        break;
      default:
        throw new Error("Data Source Not Recognised");
    }

    if (response?.status != 200) {
      throw new Error("Error retrieving person");
    }
    return response.data;
  } catch (e) {
    return null;
  }
};
