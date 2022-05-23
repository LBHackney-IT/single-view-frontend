import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";
import { housingSearchPerson } from "../Interfaces";

export const SearchResident = async (
  firstName: string,
  lastName: string,
  address: string | null,
  page: number,
  jigsawToken: string | null
): Promise<housingSearchPerson[]> => {
  const response = await axios.get(
    `${process.env.SV_API_V1}/search?firstName=${firstName}&lastName=${lastName}&page=${page}&redisId=${jigsawToken}`,
    {
      headers: {
        authorization: `${getToken()}`,
      },
    }
  );

  return sortResponseByRelevance(
    response.data.searchResponse.searchResults,
    address
  );
};
