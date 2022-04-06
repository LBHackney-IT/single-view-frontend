import React, { useState, useEffect } from "react";
import { DescriptionListItem } from "../../Components";
import { Person } from "../../Interfaces/personInterfaces";
import { formatDateOfBirth } from "../../Utils/formatDateOfBirth";

interface Props {
  person: Person;
}

// TODO: Migrate this to a util?
const fullName = (person: Person): string => {
  return `
        ${person.title}
        ${person.preferredFirstName || person.firstName}
        ${person.middleName || ""}
        ${person.preferredSurname || person.surname}
    `;
};

export const Profile = (props: Props) => {
  const [person, setPerson] = useState<Person>(props.person);

  useEffect(() => {
    setPerson(props.person);
  }, [props.person]);

  return (
    <>
      <dl className="govuk-summary-list lbh-summary-list">
        <DescriptionListItem title="Name">
          {fullName(person)}
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
      </dl>
    </>
  );
};
