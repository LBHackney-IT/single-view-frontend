import axios from "axios";
import { getToken } from "../Utils/getToken";

export const SearchResident = async (
  searchParams: string,
  domain: string
): Promise<any> => {
  const response = await axios.get(
    `https://v4xprqejik.execute-api.eu-west-2.amazonaws.com/staging/api/v1/search/${domain}?searchText=${searchParams}`,
    {
      headers: {
        Authorization: `${getToken()}`,
      },
    }
  );
  if (response.status >= 400) {
    return new Error("Error searching");
  }
  console.log(response.data.results.persons);
  return response.data.results.persons;
};
