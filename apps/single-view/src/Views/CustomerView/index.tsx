import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomer } from "../../Gateways";
import { Person, UrlParams } from "../../Interfaces";
import { Profile } from "./Profile";

export const CustomerView = () => {
  const { id } = useParams<UrlParams>();
  const [person, setPerson] = useState<Person>({
    id: "cbd7d7b7-c68a-4741-898d-36492b85f189",
    title: "Mrs",
    firstname: "test",
    middleName: null,
    surname: "test",
    preferredFirstname: null,
    preferredSurname: null,
    totalBalance: 0.0,
    dateOfBirth: "1990-12-12",
    personTypes: ["Tenant"],
    IsPersonCautionaryAlerted: false,
    IsTenureCautionaryAlerted: false,
    tenures: [
      {
        id: "6bc70564-b4f3-4dd1-ac36-26f3572d1d61",
        type: "Commercial Let",
        totalBalance: 0.0,
        startDate: "2022-10-10T00:00:00Z",
        endDate: null,
        assetFullAddress:
          "Psp 36 Nelson Mandela House 124 Cazenove Road Hackney London N16 6AJ",
        postCode: null,
        paymentReference: null,
        isActive: true,
      },
    ],
  });

  const customer = getCustomer(id);

  console.log(customer);

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
