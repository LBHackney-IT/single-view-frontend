import axios from "axios";
import { customerProfile, SystemId } from "../Interfaces";

const createSharedPlanError = new Error("Error creating shared plan");

export async function createSharedPlan(
  person: customerProfile,
  systemIds: Array<SystemId>
): Promise<string | Error> {
  const response = await axios.post(
    `${process.env.SV_API_V1}/sharedPlan`,
    {
      firstName: person.firstName,
      lastName: person.surname,
      systemIds: systemIds.map((systemId) => systemId.id),
      numbers: person.allContactDetails
        ? person.allContactDetails.filter(
            (contactDetail) => contactDetail.contactType == "Phone"
          )
        : null,
      emails: person.allContactDetails
        ? person.allContactDetails.filter(
            (contactDetail) => contactDetail.contactType == "Email"
          )
        : null,
      hasPhp: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status != 200) {
    throw createSharedPlanError;
  }
  return response.data;
}
