import axios from "axios";
import { customerProfile } from "../Interfaces";
import { getToken } from "../Utils";

export const createSharedPlanError = new Error("Error creating shared plan");

export async function createSharedPlan(
  person: customerProfile
): Promise<string | Error> {
  console.log("POSTING...");
  const response = await axios.post(
    `${process.env.SV_API_V1}/shared-plan`,
    // `${process.env.SV_API_V1}/customers`,
    person,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    }
  );
  // const response = {
  //   "status": 200,
  //   "data": "test"
  // }
  console.log("POST response: " + response.status);
  if (response.status != 201) {
    console.log("ERROR!");
    throw createSharedPlanError;
  }
  return response.data;
}
