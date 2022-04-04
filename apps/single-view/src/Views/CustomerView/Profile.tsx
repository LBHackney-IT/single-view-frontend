import React, { useState } from "react";
import { DescriptionListItem } from "../../Components";
import { Person } from "../../Interfaces";

interface Props {
  person: Person;
}

const fullName = (person: Person): string => {
  return `
        ${person.title}
        ${person.preferredFirstname || person.firstname}
        ${person.middleName || ""}
        ${person.preferredSurname || person.surname}
    `;
};

export const Profile = (props: Props) => {
  const [person, SetPerson] = useState<Person>(props.person);

  return (
    <>
      <dl className="govuk-summary-list lbh-summary-list">
        <DescriptionListItem title="Name">
          {fullName(person)}
        </DescriptionListItem>
        <DescriptionListItem title="Date of Birth">
          {person.dateOfBirth}
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
