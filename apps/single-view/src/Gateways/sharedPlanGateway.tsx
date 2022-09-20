import axios from "axios";
import { customerProfile, customerSharedPlan, SystemId } from "../Interfaces";
import { CreatedSharedPlan } from "../Interfaces/sharedPlanInterfaces";

const createSharedPlanError = new Error("Error creating shared plan");

export async function createSharedPlan(
  person: customerProfile,
  systemIds: Array<SystemId>
): Promise<CreatedSharedPlan> {
  // debugger;
  const requestData = {
    firstName: person.firstName,
    lastName: person.surname,
    systemIds: systemIds.map((systemId) => systemId.id),
    numbers: person.allContactDetails
      ? person.allContactDetails
          ?.filter((contactDetail) => {
            return contactDetail.contactType.toLowerCase() == "phone";
          })
          .map((filteredContactDetail) => filteredContactDetail.value)
      : null,
    emails: person.allContactDetails
      ? person.allContactDetails
          ?.filter((contactDetail) => {
            return contactDetail.contactType.toLowerCase() == "email";
          })
          .map((filteredContactDetail) => filteredContactDetail.value)
      : null,
    hasPhp: false,
  };

  const response = await axios.post(
    `${process.env.SV_API_V1}/sharedPlan`,
    requestData,
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
