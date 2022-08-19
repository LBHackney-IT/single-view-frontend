import React from "react";
import {
  jigsawCasesResponse,
  Placement,
  HouseHoldComposition,
} from "../Interfaces";
import { formatDate } from "../Utils";
import { jigsawAddressToString } from "../Utils/jigsawCaseAddressToString";
import { DescriptionListItem } from "./DescriptionListItem";
import { HouseHoldMember } from "./HouseholdMember";

interface Props {
  jigsawCaseResponse: jigsawCasesResponse | null;
}

export const CaseSummary: React.FC<Props> = (props) => {
  const additionalFactors = props.jigsawCaseResponse?.additionalFactors;
  const healthAndWellBeing = props.jigsawCaseResponse?.healthAndWellBeing;

  return (
    <dl className="govuk-summary-list lbh-summary-list">
      <h3>Case Summary</h3>
      <DescriptionListItem title="Case Id" testId="caseId">
        {props.jigsawCaseResponse?.currentCase.id}
      </DescriptionListItem>
      <DescriptionListItem title="Status" testId="statusName">
        {props.jigsawCaseResponse?.currentCase.statusName}
      </DescriptionListItem>
      <DescriptionListItem title="Date of Approach" testId="dateOfApproach">
        {formatDate(props.jigsawCaseResponse?.currentCase.dateOfApproach || "")}
      </DescriptionListItem>
      <DescriptionListItem title="Assigned To" testId="assignedTo">
        {props.jigsawCaseResponse?.currentCase.assignedTo}
      </DescriptionListItem>
      <DescriptionListItem title="V2 Legacy Case?" testId="isV2Legacy">
        {props.jigsawCaseResponse?.currentCase.isV2LegacyCase.toString()}
      </DescriptionListItem>
      <h3>Case Overview</h3>
      <DescriptionListItem
        title="Flowchart Position"
        testId="currentFlowChartPosition"
      >
        {props.jigsawCaseResponse?.caseOverview.currentFlowchartPosition}
      </DescriptionListItem>
      <DescriptionListItem title="Current Decision" testId="currentDecision">
        {props.jigsawCaseResponse?.caseOverview.currentDecision}
      </DescriptionListItem>
      <DescriptionListItem
        title="Household Composition"
        testId="householdComposition"
      >
        {props.jigsawCaseResponse?.caseOverview.householdComposition.map(
          (member: HouseHoldComposition) => {
            return <HouseHoldMember member={member} />;
          }
        )}
      </DescriptionListItem>

      <h3>Placement Details</h3>
      {props.jigsawCaseResponse?.placementInformation.map(
        (placement: Placement) => {
          return (
            <>
              <DescriptionListItem
                title="Placement Type"
                testId="placementType"
              >
                {placement.placementType}
              </DescriptionListItem>
              <DescriptionListItem title="Full Address" testId="fullAddress">
                {jigsawAddressToString(placement.fullAddressDetails)}
              </DescriptionListItem>

              <DescriptionListItem title="Duty" testId="placementDuty">
                {placement.placementDuty}
              </DescriptionListItem>

              <DescriptionListItem
                title="Placement Duty Full Name"
                testId="placementDutyFullName"
              >
                {placement.placementDutyFullName}
              </DescriptionListItem>

              <DescriptionListItem title="Usage" testId="placementUsage">
                {placement.usage}
              </DescriptionListItem>

              <DescriptionListItem
                title="DCLG Classification"
                testId="dclgClassification"
              >
                {placement.dclgClassificationType}
              </DescriptionListItem>
            </>
          );
        }
      )}

      {additionalFactors &&
        additionalFactors.map((additionalFactor, index) => {
          return [
            <h3>{additionalFactor.legend}</h3>,
            additionalFactor.info.map((factorInfo, factorIndex) => {
              return (
                <DescriptionListItem
                  title={factorInfo.question}
                  testId={"AdditionalFactor-" + factorIndex}
                >
                  {factorInfo.answer}
                </DescriptionListItem>
              );
            }),
          ];
        })}

      {healthAndWellBeing &&
        healthAndWellBeing.map((wellBeingFactor, index) => {
          return [
            <h3>{wellBeingFactor.legend}</h3>,
            wellBeingFactor.info.map((factorInfo, factorIndex) => {
              return (
                <DescriptionListItem
                  title={factorInfo.question}
                  testId={"WellBeingFactor-" + factorIndex}
                >
                  {factorInfo.answer}
                </DescriptionListItem>
              );
            }),
          ];
        })}
    </dl>
  );
};
