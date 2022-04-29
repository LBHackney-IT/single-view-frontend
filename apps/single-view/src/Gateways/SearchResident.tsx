import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";
import { housingSearchPerson } from "../Interfaces";

export const SearchResident = async (
  searchParams: string,
  address: string | null
): Promise<housingSearchPerson[]> => {
  const response = await axios.get(
    `${process.env.SV_API}/search?searchText=${searchParams}&page=1`, //allow multiple page searching
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
