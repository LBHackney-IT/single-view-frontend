import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";
import { Person } from "../Interfaces";

export const SearchResident = async (
  searchParams: string,
  address: string | null
): Promise<Person[]> => {
  console.log(process.env);
  const response = await axios.get(
    `${process.env.HOUSING_SEARCH_API_V1}/search/persons?searchText=${searchParams}`,
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    }
  );
  return sortResponseByRelevance(response.data.results.persons, address);
};
