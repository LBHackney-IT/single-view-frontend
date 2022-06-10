import axios from "axios";
import { housingSearchPerson } from "../Interfaces";
import { getToken } from "../Utils";

export const mergeError = new Error("Error merging records");

export const mergeRecords = async (
  records: housingSearchPerson[]
): Promise<string | Error> => {
  const response = await axios.post(
    `${process.env.SV_API_V1}/customers`,
    records,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    }
  );

  if (response.status != 201) {
    throw mergeError;
  }
  return response.data;
};
