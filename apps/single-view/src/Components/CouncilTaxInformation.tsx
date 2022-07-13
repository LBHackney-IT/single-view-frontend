import React from "react";
import { councilTaxAccount } from "../Interfaces";
import { DescriptionListItem } from "./DescriptionListItem";
import { councilTaxAddressToString } from "../Utils/academyAddressToString";

interface Props {
  councilTaxAccount: councilTaxAccount | null;
}

export const CouncilTaxInformation: React.FC<Props> = (props) => {
  return (
    <>
      <h3>Council Tax</h3>
      <DescriptionListItem title="Account Reference" testId="accountRef">
        {props.councilTaxAccount?.accountReference}
      </DescriptionListItem>
      <DescriptionListItem title="Balance" testId="accountBalance">
        £{props.councilTaxAccount?.accountBalance}
      </DescriptionListItem>
      <DescriptionListItem title="Payment Method" testId="paymentMethod">
        {props.councilTaxAccount?.paymentMethod}
      </DescriptionListItem>
      <DescriptionListItem title="Property Address" testId="propertyAddress">
        {councilTaxAddressToString(props.councilTaxAccount?.propertyAddress)}
      </DescriptionListItem>
      <DescriptionListItem
        title="Forwarding Address"
        testId="forwardingAddress"
      >
        {councilTaxAddressToString(props.councilTaxAccount?.forwardingAddress)}
      </DescriptionListItem>
    </>
  );
};
