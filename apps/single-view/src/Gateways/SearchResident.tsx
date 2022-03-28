import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { sortResponseByRelevance } from "../Utils/sortResponse";

export const SearchResident = async (
  searchParams: string,
  address: string | null
): Promise<any> => {
  const response = await axios.get(
    `https://v4xprqejik.execute-api.eu-west-2.amazonaws.com/staging/api/v1/search/persons?searchText=${searchParams}`,
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    }
  );
  if (response.status >= 400) {
    console.log(response);
    return new Error("Error searching");
  }

  console.log(sortResponseByRelevance(response.data.results.persons, address));
  return sortResponseByRelevance(response.data.results.persons, address);
};
