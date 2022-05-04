import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";
import { housingSearchPerson } from "../Interfaces";

export const SearchResident = async (
  searchParams: string,
  address: string | null,
  page: number
): Promise<housingSearchPerson[]> => {
  const response = await axios.get(
    `${process.env.SV_API_V1}/search?searchText=${searchParams}&page=${page}`,
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
