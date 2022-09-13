import axios from "axios";
import { customerProfile, SystemId } from "../Interfaces";

const createSharedPlanError = new Error("Error creating shared plan");

export async function createSharedPlan(
  person: customerProfile,
  systemIds: Array<SystemId>
): Promise<string | Error> {
  const response = await axios.post(
    `${process.env.SV_API_V1}/sharedPlan`,
    // {
    //   firstName: "Patrick",
    //   lastName: "HINDS",
    //   niNumber: "NY004239B",
    //   systemIds: ["30389694", "189ff229-925b-49c9-9c8f-58b5f16c8a57"],
    //   numbers: ["07824826782"],
    //   emails: ["robert.collins@madetech.com"],
    //   hasPhp: null,
    // },
    {
      firstName: person.firstName,
      lastName: person.surname,
      dateOfBirth: person.dateOfBirth,
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
      hasPhp: null,
    },
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `${getToken()}`,
      },
    }
  );
  if (response.status != 201) {
    throw createSharedPlanError;
  }
  return response.data;
}
