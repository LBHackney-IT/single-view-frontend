import React from "react";
import { HouseHoldComposition } from "../Interfaces";

interface Props {
  member: HouseHoldComposition;
}

export const HouseHoldMember: React.FC<Props> = (props) => {
  return <div>{props.member.name}</div>;
};
