import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import { getPerson } from "../../Gateways";
import { getNotes } from "../../Gateways/Notes";
import { voidPerson } from "../../Utils/Person";
import { Note, Person, UrlParams } from "../../Interfaces";
import { sortNotes } from "../../Utils/sortNotes";

export const CustomerView = () => {
  const { id } = useParams<UrlParams>();
  const [person, setPerson] = useState<Person>(voidPerson);
  const [notes, setNotes] = useState<Array<Note>>([
    {
      id: "",
      title: "",
      description: "",
      targetType: "person",
      targetId: "",
      createdAt: String(new Date()),
      categorisation: {
        category: "appointments",
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
    setPerson(await getPerson(id));
  };

  //Need to get notes from tenures, without descending into async/await hell
  const loadNotes = async (): Promise<void> => {
    setNotes(sortNotes(await getNotes(id)));
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
