import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";
import { housingSearchPerson, housingSearchResults } from "../Interfaces";

export const SearchResident = async (
  firstName: string,
  lastName: string,
  address: string | null,
  jigsawToken: string | null,
  dateOfBirth: string | null
): Promise<housingSearchResults> => {
  let requestUrl = `${process.env.SV_API_V1}/search?firstName=${firstName}&lastName=${lastName}`;
  if (jigsawToken) {
    requestUrl += `&redisId=${jigsawToken}`;
  }
  if (dateOfBirth) {
    requestUrl += `&dateOfBirth=${dateOfBirth}`;
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
      address
    ),
  };

  return results;
};
