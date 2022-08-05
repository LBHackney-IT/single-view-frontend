import React from "react";
import { EqualityData } from "../Interfaces/equalityInformationInterfaces";
import { DescriptionListItem } from "./DescriptionListItem";

interface Props {
  equalityData: EqualityData | null;
}

export const EqualityInformation: React.FC<Props> = (props) => {
  const gender =
    props.equalityData?.gender?.genderValue?.toLowerCase() == "other"
      ? props.equalityData?.gender?.genderValueIfOther
      : props.equalityData?.gender?.genderValue;
  const ethnicity =
    props.equalityData?.ethnicity?.ethnicGroupValue?.toLowerCase() == "other"
      ? props.equalityData?.ethnicity?.ethnicGroupValueIfOther
      : props.equalityData?.ethnicity?.ethnicGroupValue;
  const religionOrBelief =
    props.equalityData?.religionOrBelief?.religionOrBeliefValue?.toLowerCase() ==
    "other"
      ? props.equalityData?.religionOrBelief?.religionOrBeliefValueIfOther
      : props.equalityData?.religionOrBelief?.religionOrBeliefValue;

  return (
    <>
      <h3>Equality Information</h3>

      <DescriptionListItem
        title={"Gender"}
        testId={"equalityInformationGender"}
      >
        {gender}
      </DescriptionListItem>
      <DescriptionListItem
        title={"Gender different at birth"}
        testId={"genderDifferentAtBirth"}
      >
        {props.equalityData?.gender?.genderDifferentToBirthSex}
      </DescriptionListItem>
      <DescriptionListItem title={"Ethnicity"} testId={"ethnicity"}>
        {ethnicity}
      </DescriptionListItem>
      <DescriptionListItem
        title={"Religion or Belief"}
        testId={"religionOrBelief"}
      >
        {religionOrBelief}
      </DescriptionListItem>
      <DescriptionListItem title={"Married"} testId={"married"}>
        {props.equalityData?.marriageOrCivilPartnership?.married}
      </DescriptionListItem>
      <DescriptionListItem
        title={"Civil partnership"}
        testId={"civilPartnership"}
      >
        {props.equalityData?.marriageOrCivilPartnership?.civilPartnership}
      </DescriptionListItem>
      <DescriptionListItem
        title={"Pregnancy or Maternity"}
        testId={"pregnancyOrMaternity"}
      >
        {props.equalityData?.pregnancyOrMaternity?.map(
          (pregnancyOrMaternity, index) => {
            return (
              <div key={index}>
                <span
                  className="govuk-!-font-weight-bold"
                  data-testId={"pregnancyValidUntil"}
                >
                  Pregnancy Date:{" "}
                </span>
                {pregnancyOrMaternity.pregnancyDate} <br />
                <span
                  className="govuk-!-font-weight-bold"
                  data-testId={"pregnancyValidUntil"}
                >
                  Pregnancy Valid Until:{" "}
                </span>
                {pregnancyOrMaternity.pregnancyValidUntil}
              </div>
            );
          }
        )}
      </DescriptionListItem>
      <DescriptionListItem title={"Disabled"} testId={"disabled"}>
        {props.equalityData?.disabled}
      </DescriptionListItem>
      <DescriptionListItem
        title={"Communication Requirements"}
        testId={"communicationRequirements"}
      >
        {props.equalityData?.communicationRequirements.map(
          (communicationRequirement, index) => {
            return (
              <span key={index}>
                {communicationRequirement}
                <br />
              </span>
            );
          }
        )}
      </DescriptionListItem>
    </>
  );
};
