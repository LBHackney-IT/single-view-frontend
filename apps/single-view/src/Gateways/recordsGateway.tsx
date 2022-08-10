import axios from "axios";
import { matchedRecord } from "../Interfaces";
import { getToken } from "../Utils";

export const mergeError = new Error("Error merging records");
export const unMergeError = new Error("Error unmerging records");

export const mergeRecords = async (
  matchedRecord: matchedRecord
): Promise<string | Error> => {
  const response = await axios.post(
    `${process.env.SV_API_V1}/customers`,
    matchedRecord,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    }
  );

  if (response.status != 200) {
    throw mergeError;
  }
  return response.data;
};

export const unmergeRecords = async (id: string): Promise<boolean> => {
  const response = await axios.delete(
    `${process.env.SV_API_V1}/customers?id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    }
  );
  if (response.status != 200) {
    throw unMergeError;
  }

  return response.data;
};
