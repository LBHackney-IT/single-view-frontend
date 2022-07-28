import React from "react";
import { jigsawCasesResponse, Placement } from "../Interfaces";
import { formatDate } from "../Utils";
import { jigsawAddressToString } from "../Utils/jigsawCaseAddressToString";
import { DescriptionListItem } from "./DescriptionListItem";

interface Props {
  jigsawCaseResponse: jigsawCasesResponse | null;
}

export const CaseSummary: React.FC<Props> = (props) => {
  console.log(props.jigsawCaseResponse);

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
        {props.jigsawCaseResponse?.caseOverview.houseHoldComposition}
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

      <h3>Additional Factors</h3>

      <table className="govuk-table">
        <caption className="govuk-table__caption govuk-table__caption--m">Dates and amounts</caption>
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">First 6 weeks</th>
            <td className="govuk-table__cell">£109.80 per week</td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">Next 33 weeks</th>
            <td className="govuk-table__cell">£109.80 per week</td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">Total estimated pay</th>
            <td className="govuk-table__cell">£4,282.20</td>
          </tr>
        </tbody>
      </table>
    </dl>
  );
};
