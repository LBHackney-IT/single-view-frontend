import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import { getPerson } from "../../Gateways";
import { getNotes } from "../../Gateways/Notes";
import { Note, Person, UrlParams } from "../../Interfaces";

export const CustomerView = () => {
  const { id } = useParams<UrlParams>();
  const [person, setPerson] = useState<Person>({
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
  });
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "",
      title: "",
      description: "",
      targetType: "",
      targetId: "",
      createdAt: "",
      categorisation: {
        category: "",
        subCategory: "",
        description: "",
      },
      author: {
        fullName: "",
        email: "",
      },
      highlight: false,
    },
  ]);

  const loadPerson = async (): Promise<void> => {
    let person = await getPerson(id);

    setPerson(person);
  };

  const loadNotes = async (): Promise<void> => {
    let notes = await getNotes(id);
    setNotes(notes);
    //TODO: get notes from tenures and sort
  };

  useEffect(() => {
    loadPerson();
    loadNotes();
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
          <li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
            <a className="govuk-tabs__tab" href="#notes">
              Notes
            </a>
          </li>
        </ul>

        <section className="govuk-tabs__panel" id="profile">
          <Profile person={person} />
        </section>
        <section className="govuk-tabs__panel" id="notes">
          <Notes notes={notes} />
        </section>
      </div>
    </>
  );
};
