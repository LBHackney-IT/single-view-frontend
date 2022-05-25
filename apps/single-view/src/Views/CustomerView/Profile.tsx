import React, { useState, useEffect } from "react";
import { DescriptionListItem } from "../../Components";
import { customerProfile } from "../../Interfaces/customerProfileInterfaces";
import { formatDateOfBirth } from "../../Utils/formatDates";
import { Center, Spinner } from "@mfe/common/lib/components";

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
        <DescriptionListItem title="Middle Name(s)" testId="middleName">
          {person.middleName}
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
                {address.fullAddress}
              </p>
            );
          })}
        </DescriptionListItem>
        <DescriptionListItem title="Types" testId="types">
          {person.personTypes?.join(", ")}
        </DescriptionListItem>
        <DescriptionListItem title="National Insurance Number" testId="nino">
          {person.nino}
        </DescriptionListItem>
        <DescriptionListItem title="Place of Birth" testId="placeOfBirth">
          {person.placeOfBirth}
        </DescriptionListItem>
        <DescriptionListItem title="Date of Death" testId="dateOfDeath">
          {person.dateofDeath}
        </DescriptionListItem>
        <DescriptionListItem title="Is a Minor" testId="isMinor">
          {person.isAMinor ? "Y" : "N"}
        </DescriptionListItem>
      </dl>
    </>
  );
};
