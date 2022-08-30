import React from "react";
import { DescriptionListItem } from "./DescriptionListItem";
import { housingBenefitsAccount } from "../Interfaces/housingBenefitsRecordInterfaces";
import { formatCurrency, formatDateOfBirth } from "../Utils";
import { HouseHoldMember } from "./HouseholdMember";

interface Props {
  housingBenefitsAccount: housingBenefitsAccount | null;
}

export const HousingBenefitsInformation: React.FC<Props> = (props) => {
  let landlordAddressLine1 =
    props.housingBenefitsAccount?.housingBenefitLandlordDetails?.addr1 !==
    "" ? (
      <span>
        {props.housingBenefitsAccount?.housingBenefitLandlordDetails?.addr1?.trim()}
        ,
      </span>
    ) : (
      <span />
    );
  let landlordAddressLine2 =
    props.housingBenefitsAccount?.housingBenefitLandlordDetails?.addr2 !==
    "" ? (
      <span>
        {props.housingBenefitsAccount?.housingBenefitLandlordDetails?.addr2?.trim()}
        ,
      </span>
    ) : (
      <span />
    );
  let landlordAddressLine3 =
    props.housingBenefitsAccount?.housingBenefitLandlordDetails?.addr3 !==
    "" ? (
      <span>
        {props.housingBenefitsAccount?.housingBenefitLandlordDetails?.addr3?.trim()}
        ,
      </span>
    ) : (
      <span />
    );
  let landlordAddressLine4 =
    props.housingBenefitsAccount?.housingBenefitLandlordDetails?.addr4 !==
    "" ? (
      <span>
        {props.housingBenefitsAccount?.housingBenefitLandlordDetails?.addr4?.trim()}
        ,
      </span>
    ) : (
      <span />
    );

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
      <DescriptionListItem
        title="Household Composition"
        testId="householdMembers"
      >
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
      <DescriptionListItem
        title="Weekly Housing Benefit Amount And Payee"
        testId="whba"
      >
        {props.housingBenefitsAccount?.weeklyHousingBenefitDetails
          ? `£${props.housingBenefitsAccount?.weeklyHousingBenefitDetails.weeklyHousingBenefit} : ${props.housingBenefitsAccount?.weeklyHousingBenefitDetails.housingBenefitPayee}`
          : ""}
      </DescriptionListItem>

      {props.housingBenefitsAccount?.housingBenefitLandlordDetails && (
        <DescriptionListItem
          title="Housing Benefit Landlord Details"
          testId="housingBenefitLandlordDetails"
        >
          <div>
            <span
              className="govuk-!-font-weight-bold"
              data-testid={"landLordName"}
            >
              {props.housingBenefitsAccount.housingBenefitLandlordDetails.name}
            </span>
            <br />
            <span data-testid={"landlordAddress"}>
              {landlordAddressLine1} {landlordAddressLine2}{" "}
              {landlordAddressLine3} {landlordAddressLine4}{" "}
              {
                props.housingBenefitsAccount.housingBenefitLandlordDetails
                  .postcode
              }
            </span>
            <br />
            <span className="govuk-!-font-weight-bold"> Claim Id: </span>
            {props.housingBenefitsAccount.housingBenefitLandlordDetails.claimId}
            <br />
            <span className="govuk-!-font-weight-bold">Creditor Id: </span>
            {
              props.housingBenefitsAccount.housingBenefitLandlordDetails
                .creditorId
            }
          </div>
        </DescriptionListItem>
      )}

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
