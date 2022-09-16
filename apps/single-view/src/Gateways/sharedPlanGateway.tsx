import axios from "axios";
import { customerProfile, customerSharedPlan, SystemId } from "../Interfaces";
import { CreatedSharedPlan } from "../Interfaces/sharedPlanInterfaces";

const createSharedPlanError = new Error("Error creating shared plan");

export async function createSharedPlan(
  person: customerProfile,
  systemIds: Array<SystemId>
): Promise<CreatedSharedPlan> {
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

  if (response.status != 201) {
    throw createSharedPlanError;
  }
  return response.data;
}
