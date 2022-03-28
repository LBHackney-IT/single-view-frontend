import axios, { AxiosResponse } from "axios";
import { getToken } from "../Utils/getToken";

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

  console.log(response.data.results.persons);
  console.log(sortResponse(response, address));
  return response.data.results.persons;
};

const sortResponse = (response: AxiosResponse<any>, address: string | null) => {
  let personData = response.data.results.persons;
  let results: any = [];
  let itemAddress;
  for (let index in personData) {
    let result = {
      score: 0,
      data: {},
    };
    let item = personData[index];

    //checks addresses in data
    if (item.tenures.length > 0) {
      itemAddress = item.tenures[0].assetFullAddress;
    } else {
      result.score = 0;
      result.data = item;
      results.push(result);
      continue;
    }

    if (address && itemAddress.indexOf(address) > -1) {
      result.score += 1;
    }
    result.data = item;
    results.push(result);
  }
  results.sort((a: any, b: any) => {
    if (a.score < b.score) {
      return 1;
    }

    if (a.score > b.score) {
      return -1;
    }

    return 0;
  });

  return results.map((result: any) => result.data);
};
