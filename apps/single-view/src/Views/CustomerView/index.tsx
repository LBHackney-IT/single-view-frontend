import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import { getPerson } from "../../Gateways";
import { getNotes } from "../../Gateways/Notes";
import { voidPerson } from "../../Utils/Person";
import { Note, Person, UrlParams } from "../../Interfaces";
import { sortNotes } from "../../Utils/sortNotes";
import { voidNotes } from "../../Utils/Note";

export const CustomerView = () => {
  const { id } = useParams<UrlParams>();
  const [person, setPerson] = useState<Person>(voidPerson);
  const [notes, setNotes] = useState<Array<Note>>();

  const loadPerson = async (): Promise<void> => {
    setPerson(await getPerson(id));
  };

  const loadNotes = async (): Promise<void> => {
    let result = await getNotes(id);

    if (result) {
      setNotes(sortNotes(result));
    }
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
          {notes ? (
            <Notes notes={notes} />
          ) : (
            <div className="govuk-inset-text lbh-inset-text">
              There were no notes found for this customer.
            </div>
          )}
        </section>
      </div>
    </>
  );
};
