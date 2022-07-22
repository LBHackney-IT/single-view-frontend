import axios from "axios";
import { jigsawCasesResponse } from "../Interfaces/jigsawCasesInterfaces";
import { getToken } from "../Utils/getHackneyToken";

export const getCasesError = new Error("Error retrieving Cases");

export const getCasesByCustomerId = async (
  customerId: string,
  jigsawToken: string | null
): Promise<jigsawCasesResponse> => {
  let url = `${process.env.SV_API_V1}/getJigsawCases?id=${customerId}`;
  if (jigsawToken) {
    url += `&redisId=${jigsawToken}`;
  }

  const response = await axios.get(encodeURI(url), {
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  if (response.status != 200) {
    throw getCasesError;
  }

  return response.data;
};
