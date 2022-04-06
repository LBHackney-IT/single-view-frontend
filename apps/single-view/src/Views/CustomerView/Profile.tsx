import React, { useState, useEffect } from "react";
import { DescriptionListItem } from "../../Components";
import { Person } from "../../Interfaces/personInterfaces";
import { formatDateOfBirth } from "../../Utils/formatDateOfBirth";

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
        <DescriptionListItem title="Name">
          {person.title} {person.firstName} {person.surname}
        </DescriptionListItem>
        <DescriptionListItem title="Middle Name(s)">
          {person.middleName}
        </DescriptionListItem>
        <DescriptionListItem title="Date of Birth">
          {formatDateOfBirth(person.dateOfBirth)}
        </DescriptionListItem>
        <DescriptionListItem title="Tenures">
          {person.tenures.map((tenure, index) => {
            return (
              <p className="lbh-body-s" key={index}>
                {tenure.assetFullAddress}
              </p>
            );
          })}
        </DescriptionListItem>
        <DescriptionListItem title="Types">
          {person.personTypes.join(", ")}
        </DescriptionListItem>
        <DescriptionListItem title="Place of Birth">
          {person.placeOfBirth}
        </DescriptionListItem>
        <DescriptionListItem title="Date of Death">
          {person.dateOfDeath}
        </DescriptionListItem>
        <DescriptionListItem title="Is a Minor">
          {person.isAMinor ? "Y" : "N"}
        </DescriptionListItem>
      </dl>
    </>
  );
};
