import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import { getPerson } from "../../Gateways";
import { customerProfile, UrlParams } from "../../Interfaces";
import { NotFound } from "../../Components";
import { SystemId } from "../../Interfaces/systemIdInterface";

export const CustomerView = () => {
  const { id, dataSource } = useParams<UrlParams>();
  const [person, setPerson] = useState<customerProfile | null>();
  const [systemIds, setSystemIds] = useState<Array<SystemId>>();

  const loadPerson = async (): Promise<customerProfile | null> => {
    try {
      let person = await getPerson(id, parseInt(dataSource));
      setPerson(person);
      return person;
    } catch (e) {
      setPerson(null);
      throw e;
    }
  };

  const loadSystemIds = (person: customerProfile | null): void => {
    let derivedSystemIds: Array<SystemId> = [];
    if (person) {
      derivedSystemIds.push({
        systemName: "PersonApi",
        id: person.id,
      });
      if (person.knownAddresses) {
        for (const tenure of person.knownAddresses) {
          derivedSystemIds.push({
            systemName: "PersonApi",
            id: tenure.id,
          });
        }
      }
    }
    setSystemIds(derivedSystemIds);
  };

  useEffect(() => {
    loadPerson().then((person) => loadSystemIds(person));
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
          <Profile profile={person} />
        </section>
        <section className="govuk-tabs__panel" id="notes">
          <Notes systemIds={systemIds} />
        </section>
      </div>
    </>
  );
};
