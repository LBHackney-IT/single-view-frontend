import React from "react";
import { createSharedPlan } from "../Gateways/sharedPlanGateway";
import { customerProfile, SystemId } from "../Interfaces";

export function displaySharedPlans(
  person: customerProfile,
  systemIds: Array<SystemId>
) {
  if (person.sharedPlan.planIds && person.sharedPlan.planIds.length >= 1) {
    // Return component linking shared plans
    return (
      <>
        {person.sharedPlan.planIds.map((planId, index) => {
          console.log(planId);
          return (
            <p>
              <a
                className="govuk-link lbh-link lbh-link--no-visited-state"
                href={process.env.SHARED_PLAN_URL + "/plans/" + planId}
                target="_blank"
              >
                View Plan {person.sharedPlan.planIds.length > 1 && index + 1}
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
