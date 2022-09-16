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
        <button
          className="govuk-link lbh-link lbh-link--no-visited-state"
          onClick={() => {
            createSharedPlanForPerson(person, systemIds);
          }}
        >
          Create Shared Plan
        </button>
        {person.sharedPlan.planIds.map((planId, index) => {
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
          createSharedPlanForPerson(person, systemIds);
        }}
      >
        Create Shared Plan
      </button>,
    ];
  }
}

async function createSharedPlanForPerson(
  person: customerProfile,
  systemIds: Array<SystemId>
): Promise<void> {
  try {
    let sharedPlanUri = await createSharedPlan(person, systemIds);
    if (typeof sharedPlanUri === "string") {
      window.open(sharedPlanUri, "_blank");
    }
  } catch (e) {
    Error("Unable to create shared plan.");
  }
}
