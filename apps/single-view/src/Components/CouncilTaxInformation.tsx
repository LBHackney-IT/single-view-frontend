import React from "react";
import { councilTaxRecord } from "../Interfaces";
import { DescriptionListItem } from "./DescriptionListItem";
import { councilTaxAddressToString } from "../Utils/academyAddressToString";

interface Props {
  councilTaxRecord: councilTaxRecord | null;
}

export const CouncilTaxInformation: React.FC<Props> = (props) => {
  return (
    <>
      <h3>Council Tax</h3>
      <DescriptionListItem title="Account Reference" testId="accountRef">
        {props.councilTaxRecord?.accountRef}
      </DescriptionListItem>
      <DescriptionListItem title="Balance" testId="accountBalance">
        {props.councilTaxRecord?.accountBalance}
      </DescriptionListItem>
      <DescriptionListItem title="Payment Method" testId="paymentMethod">
        {props.councilTaxRecord?.paymentMethod}
      </DescriptionListItem>
      <DescriptionListItem title="Property Address" testId="propertyAddress">
        {councilTaxAddressToString(props.councilTaxRecord?.propertyAddress)}
      </DescriptionListItem>
      <DescriptionListItem
        title="Forwarding Address"
        testId="forwardingAddress"
      >
        {councilTaxAddressToString(props.councilTaxRecord?.forwardingAddress)}
      </DescriptionListItem>
    </>
  );
};
