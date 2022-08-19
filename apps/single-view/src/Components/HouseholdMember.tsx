import React from "react";
import { HouseHoldComposition } from "../Interfaces";

interface Props {
  member: HouseHoldComposition;
}

export const HouseHoldMember: React.FC<Props> = (props) => {
  return (
    <tbody className="govuk-table__body">
      <td className="govuk-table__cell">{props.member.name}</td>

      <td className="govuk-table__cell">{props.member.dateOfBirth}</td>

      <td className="govuk-table__cell">{props.member.gender}</td>

      <td className="govuk-table__cell">{props.member?.niNumber}</td>

      <td className="govuk-table__cell">{props.member?.nhsNumber}</td>
    </tbody>
  );
};
