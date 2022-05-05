import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import { getPerson } from "../../Gateways";
import { Note, Person, UrlParams } from "../../Interfaces";
import { sortNotes } from "../../Utils/sortNotes";
import { loadPersonNotes, loadTenureNotes } from "../../Gateways/Notes";
import { NotFound } from "../../Components";

export const CustomerView = () => {
  const { id } = useParams<UrlParams>();
  const [person, setPerson] = useState<Person | null>();
  const [notes, setNotes] = useState<Array<Note>>();

  let collatedNotes: Array<Note> = [];

  const loadPerson = async (): Promise<Person> => {
    try {
      let person = await getPerson(id);
      setPerson(person);
      return person;
    } catch (e) {
      setPerson(null);
      throw e;
    }
  };

  useEffect(() => {
    loadPerson()
      .then((person) => {
        return loadPersonNotes(person, collatedNotes);
      })
      .then((person) => {
        return loadTenureNotes(person, collatedNotes);
      })
      .then(() => {
        setNotes(sortNotes(collatedNotes));
      });
  }, []);

  return person === null ? (
    <NotFound />
  ) : (
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
