import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";
import { Person } from "../Interfaces/housingSearchInterfaces";

export const SearchResident = async (
  searchParams: string,
  address: string | null
): Promise<Person[]> => {
  const response = await axios.get(
    `https://v4xprqejik.execute-api.eu-west-2.amazonaws.com/staging/api/v1/search/persons?searchText=${searchParams}`,
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    }
  );
  return sortResponseByRelevance(response.data.results.persons, address);
};
