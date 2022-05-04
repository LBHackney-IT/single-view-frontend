import React, { useState, useEffect } from "react";
import { DescriptionListItem } from "../../Components";
import { Person } from "../../Interfaces/personInterfaces";
import { formatDateOfBirth } from "../../Utils/formatDates";

interface Props {
  person: Person;
}

export const Profile = (props: Props) => {
  const [person, setPerson] = useState<Person>(props.person);

  useEffect(() => {
    setPerson(props.person);
  }, [props.person]);

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
          {person.tenures.map((tenure, index) => {
            return (
              <p className="lbh-body-s" key={index}>
                {tenure.assetFullAddress}
              </p>
            );
          })}
        </DescriptionListItem>
        <DescriptionListItem title="Types" testId="types">
          {person.personTypes.join(", ")}
        </DescriptionListItem>
        <DescriptionListItem title="Place of Birth" testId="placeOfBirth">
          {person.placeOfBirth}
        </DescriptionListItem>
        <DescriptionListItem title="Date of Death" testId="dateOfDeath">
          {person.dateOfDeath}
        </DescriptionListItem>
        <DescriptionListItem title="Is a Minor" testId="isMinor">
          {person.isAMinor ? "Y" : "N"}
        </DescriptionListItem>
      </dl>
    </>
  );
};
