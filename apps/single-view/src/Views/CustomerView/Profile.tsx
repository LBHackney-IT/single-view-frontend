import React, { useState, useEffect } from "react";
import { DescriptionListItem } from "../../Components";
import { customerProfile } from "../../Interfaces/customerProfileInterfaces";
import { formatDateOfBirth } from "../../Utils/formatDates";
import { Center, Spinner } from "@mfe/common/lib/components";
import { formatDate } from "@mfe/common/lib/utils";
import { CouncilTaxInformation } from "../../Components/CouncilTaxInformation";

interface Props {
  profile?: customerProfile;
}

export const Profile = (props: Props) => {
  const [person, setPerson] = useState<customerProfile | undefined>();

  useEffect(() => {
    setPerson(props.profile);
  }, [props.profile]);

  if (typeof person == "undefined") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <dl className="govuk-summary-list lbh-summary-list">
        <DescriptionListItem title="Name" testId="name">
          {person.title} {person.firstName} {person.surname}
        </DescriptionListItem>
        {person.dateOfBirth && (
          <DescriptionListItem title="Date of Birth" testId="dateOfBirth">
            {formatDateOfBirth(person.dateOfBirth)}
          </DescriptionListItem>
        )}
        <DescriptionListItem title="Tenures" testId="tenures">
          {person.knownAddresses?.map((address, index) => {
            return (
              <p className="lbh-body-s" key={index}>
                <span data-testid="tenureFullAddress">
                  {address.fullAddress}
                </span>
                <br />
                <span data-testid="tenureStartDate">
                  <span className="govuk-!-font-weight-bold">Start date</span>{" "}
                  {formatDate(address.startDate) || "N/A"}
                </span>
                <br />
                <span data-testid="tenureEndDate">
                  <span className="govuk-!-font-weight-bold">End date</span>{" "}
                  {formatDate(address.endDate) || "N/A"}
                </span>
              </p>
            );
          })}
        </DescriptionListItem>
        <DescriptionListItem title="Types" testId="types">
          {person.personTypes?.join(", ")}
        </DescriptionListItem>
        <DescriptionListItem title="National Insurance Number" testId="nino">
          {person.niNo}
        </DescriptionListItem>
        <DescriptionListItem title="Place of Birth" testId="placeOfBirth">
          {person.placeOfBirth}
        </DescriptionListItem>
        <DescriptionListItem title="NHS number" testId="nhsNo">
          {person.nhsNumber}
        </DescriptionListItem>
        <DescriptionListItem title="Date of Death" testId="dateOfDeath">
          {person.dateofDeath}
        </DescriptionListItem>
        <DescriptionListItem title="Is a Minor" testId="isMinor">
          {person.isAMinor ? "Y" : "N"}
        </DescriptionListItem>
        <CouncilTaxInformation councilTaxAccount={person.councilTaxAccount} />
      </dl>
    </>
  );
};
