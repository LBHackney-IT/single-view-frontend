import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";
import { housingSearchPerson } from "../Interfaces";

export const SearchResident = async (
  firstName: string,
  lastName: string,
  address: string | null,
  jigsawToken: string | null
): Promise<housingSearchPerson[]> => {
  let requestUrl = `${process.env.SV_API_V1}/search?firstName=${firstName}&lastName=${lastName}`;
  if (jigsawToken) {
    requestUrl += `&redisId=${jigsawToken}`;
  }
  const response = await axios.get(requestUrl, {
    headers: {
      authorization: `${getToken()}`,
    },
  });

  return sortResponseByRelevance(
    response.data.searchResponse.searchResults,
    address
  );
};
