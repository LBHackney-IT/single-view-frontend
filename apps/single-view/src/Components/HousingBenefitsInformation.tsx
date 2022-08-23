import React from "react";
import { DescriptionListItem } from "./DescriptionListItem";
import { housingBenefitsAccount } from "../Interfaces/housingBenefitsRecordInterfaces";
import { formatCurrency, formatDateOfBirth } from "../Utils";
import { HouseHoldMember } from "./HouseholdMember";

interface Props {
  housingBenefitsAccount: housingBenefitsAccount | null;
}

export const HousingBenefitsInformation: React.FC<Props> = (props) => {
  return (
    <>
      <h3>Housing Benefit</h3>
      <DescriptionListItem title="Claim ID" testId="claimId">
        {props.housingBenefitsAccount?.claimId}
      </DescriptionListItem>
      <DescriptionListItem title="Check Digit" testId="checkDigit">
        {props.housingBenefitsAccount?.checkDigit}
      </DescriptionListItem>
      <DescriptionListItem title="Person Reference" testId="personReference">
        {props.housingBenefitsAccount?.personReference}
      </DescriptionListItem>
      <DescriptionListItem title="Household Members" testId="householdMembers">
        {props.housingBenefitsAccount?.householdMembers?.map(
          (householdMember, index) => {
            return (
              <p className="lbh-body-s" key={index}>
                <span data-testid={`householdMemberName_${index}`}>
                  <span className="govuk-!-font-weight-bold">Name</span>{" "}
                  {householdMember.title} {householdMember.firstName}{" "}
                  {householdMember.lastName}
                </span>
                <br />
                <span data-testid={`householdMemberDateOfBirth_${index}`}>
                  <span className="govuk-!-font-weight-bold">
                    Date of Birth
                  </span>{" "}
                  {formatDateOfBirth(householdMember.dateOfBirth)}
                </span>
              </p>
            );
          }
        )}
      </DescriptionListItem>
      <DescriptionListItem title="Weekly Housing Benefit Amount" testId="whba">
        {`£${props.housingBenefitsAccount?.weeklyHousingBenefitAmont}`}
      </DescriptionListItem>
      <DescriptionListItem
        title="Income Received By Applicant"
        testId="benefits"
      >
        {props.housingBenefitsAccount?.benefits?.map((benefit, index) => {
          return (
            <p className="lbh-body-s" key={index}>
              <span data-testid={`benefitAmount_${index}`}>
                <span className="govuk-!-font-weight-bold">Amount</span>{" "}
                {formatCurrency(benefit.amount)}
              </span>
              <br />
              <span data-testid={`benefitDescription_${index}`}>
                <span className="govuk-!-font-weight-bold">Description</span>{" "}
                {benefit.description}
              </span>
              <br />
              <span data-testid={`benefitFrequency_${index}`}>
                <span className="govuk-!-font-weight-bold">Frequency</span>{" "}
                {benefit.frequency}
              </span>
              <br />
              <span data-testid={`benefitPeriod_${index}`}>
                <span className="govuk-!-font-weight-bold">Period</span>{" "}
                {benefit.period}
              </span>
            </p>
          );
        })}
      </DescriptionListItem>
    </>
  );
};
