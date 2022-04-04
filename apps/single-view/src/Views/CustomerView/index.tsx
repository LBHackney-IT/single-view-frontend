import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPerson } from "../../Gateways";
import { Person, UrlParams } from "../../Interfaces";
import { Profile } from "./Profile";

export const CustomerView = () => {
  const { id } = useParams<UrlParams>();
  const voidPerson = {
    id: "",
    title: "",
    firstname: "",
    middleName: "",
    surname: "",
    preferredFirstname: "",
    preferredSurname: "",
    dateOfBirth: "",
    totalBalance: 0.0,
    personTypes: [],
    IsPersonCautionaryAlerted: false,
    IsTenureCautionaryAlerted: false,
    tenures: [],
  };
  const [person, setPerson] = useState<Person>(voidPerson);

  const loadPerson = async () => {
    let person = await getPerson(id);

    setPerson(person);
  };

  useEffect(() => {
    loadPerson();
  }, []);

  return (
    <>
      <div className="govuk-tabs lbh-tabs sv-space-t" data-module="govuk-tabs">
        <h2 className="govuk-tabs__title">Contents</h2>
        <ul className="govuk-tabs__list">
          <li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
            <a className="govuk-tabs__tab" href="#profile">
              Profile
            </a>
          </li>
        </ul>
        <section className="govuk-tabs__panel" id="profile">
          <Profile person={person} />
        </section>
      </div>
    </>
  );
};
