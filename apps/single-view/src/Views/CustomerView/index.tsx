import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { getPerson } from "../../Gateways";
import { getNotes } from "../../Gateways/Notes";
import { UrlParams } from "../../Interfaces";
import { Person } from "../../Interfaces/personInterfaces";
import { voidPerson } from "../../Utils/Person";

export const CustomerView = () => {
  const { id } = useParams<UrlParams>();
  const [person, setPerson] = useState<Person>(voidPerson);

  const loadPerson = async (): Promise<void> => {
    setPerson(await getPerson(id));
  };

  useEffect(() => {
    loadPerson();
    getNotes(id);
    person.tenures.forEach((tenure) => {
      getNotes(tenure.id);
    });
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
