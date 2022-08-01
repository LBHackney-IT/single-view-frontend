import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";
import { housingSearchPerson, housingSearchResults } from "../Interfaces";

interface params {
  firstName: string;
  lastName: string;
  address: string | null;
  jigsawToken: string | null;
  dateOfBirth: string | null;
}

export const SearchResident = async (
  params: params
): Promise<housingSearchResults> => {
  let requestUrl = `${process.env.SV_API_V1}/search?firstName=${params.firstName}&lastName=${params.lastName}`;
  if (params.jigsawToken) {
    requestUrl += `&redisId=${params.jigsawToken}`;
  }
  if (params.dateOfBirth) {
    requestUrl += `&dateOfBirth=${params.dateOfBirth}`;
  }
  const response = await axios.get(requestUrl, {
    headers: {
      authorization: `${getToken()}`,
    },
  });

  const results: housingSearchResults = {
    matchedResults: response.data.searchResponse.groupedResults,
    otherResults: sortResponseByRelevance(
      response.data.searchResponse.ungroupedResults,
      params.address
    ),
  };

  return results;
};
