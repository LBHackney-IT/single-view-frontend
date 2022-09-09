import React from "react";
import { createSharedPlan } from "../Gateways/sharedPlanGateway";
import { customerProfile, SystemId } from "../Interfaces";

export function displaySharedPlans(
  person: customerProfile,
  systemIds: Array<SystemId>
) {
  if (person.sharedPlans && person.sharedPlans.length >= 1) {
    // Return component linking shared plans
    return (
      <>
        {person.sharedPlans.map((sharedPlan, index) => {
          console.log(sharedPlan.id);
          return (
            <p>
              <a
                className="govuk-link lbh-link lbh-link--no-visited-state"
                href={
                  "https://sharedplan.hackney.gov.uk/plans/" + sharedPlan.id
                }
                target="_blank"
              >
                View Plan {person.sharedPlans.length > 1 && index}
              </a>
            </p>
          );
        })}
      </>
    );
  } else {
    // Return link to create a shared plan
    return [
      <strong>NO PLAN FOUND - </strong>,
      <button
        className="govuk-link lbh-link lbh-link--no-visited-state"
        onClick={() => {
          console.log("Creation button clicked!");
          createSharedPlanForPerson(person, systemIds);
        }}
      >
        Create Shared Plan
      </button>,
    ];
  }
}

const createSharedPlanForPerson = async (
  person: customerProfile,
  systemIds: Array<SystemId>
) => {
  try {
    const sharedPlanId = await createSharedPlan(person, systemIds);
    window.open(
      "https://sharedplan.hackney.gov.uk/plans/" + sharedPlanId,
      "_blank"
    );
  } catch (e) {
    Error("Unable to create shared plan.");
  }
};
