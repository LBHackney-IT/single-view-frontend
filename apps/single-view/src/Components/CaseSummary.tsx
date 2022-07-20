import React from "react";
import { jigsawCasesResponse, Placement } from "../Interfaces";
import { DescriptionListItem } from "./DescriptionListItem";

interface Props {
  jigsawCaseResponse: jigsawCasesResponse | null;
}

export const CaseSummary: React.FC<Props> = (props) => {
  return (
    <>
      <h3>Case Summary</h3>
      <DescriptionListItem title="Case Id" testId="caseId">
        {props.jigsawCaseResponse?.currentCase.id}
      </DescriptionListItem>
      <DescriptionListItem title="Status" testId="statusName">
        {props.jigsawCaseResponse?.currentCase.statusName}
      </DescriptionListItem>
      <DescriptionListItem title="Date of Approach" testId="dateOfApproach">
        {props.jigsawCaseResponse?.currentCase.dateOfApproach}
      </DescriptionListItem>
      <DescriptionListItem title="Assigned To" testId="assignedTo">
        {props.jigsawCaseResponse?.currentCase.assignedTo}
      </DescriptionListItem>
      <DescriptionListItem title="V2 Legacy Case?" testId="isV2Legacy">
        {props.jigsawCaseResponse?.currentCase.isV2LegacyCase.toString()}
      </DescriptionListItem>
      <h4>Case Overview</h4>
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
        {props.jigsawCaseResponse?.caseOverview.houseHoldComposition}
      </DescriptionListItem>
      <h4>Placement Details</h4>
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
                {/* TODO: Write Utility Function To Parse Address */}
                {"Address"}
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
    </>
  );
};
