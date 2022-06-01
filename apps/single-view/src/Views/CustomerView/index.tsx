import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import { getPerson } from "../../Gateways";
import { customerProfile, UrlParams } from "../../Interfaces";
import { NotFound } from "../../Components";
import { SystemId } from "../../Interfaces/systemIdInterface";

export const CustomerView = () => {
  const { dataSource, id } = useParams<UrlParams>();
  const [person, setPerson] = useState<customerProfile | null>();
  const [mmhUrl, setMhUrl] = useState<string>("");
  const [systemIds, setSystemIds] = useState<Array<SystemId>>();

  const loadPerson = async (): Promise<customerProfile | null> => {
    try {
      let person = await getPerson(dataSource, id);
      setPerson(person);
      if (person?.dataSource == "HousingSearchApi") {
        setMhUrl(`${process.env.MMH_URL}/person/${person.id}`);
      }
      return person;
    } catch (e) {
      setPerson(null);
      throw e;
    }
  };

  const loadSystemIds = (person: customerProfile | null): void => {
    let derivedSystemIds: Array<SystemId> = [];
    if (person) {
      console.log(`adding notes for person ${JSON.stringify(person)}`);
      derivedSystemIds.push({
        systemName:
          person.dataSource == "HousingSearchApi" ? "PersonApi" : "Jigsaw",
        id: person.id,
      });
      if (person.knownAddresses && person.dataSource != "Jigsaw") {
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
      {mmhUrl && (
        <a
          className="govuk-link lbh-link lbh-link--no-visited-state align-right"
          href={mmhUrl}
          target="_blank"
        >
          View on MMH
        </a>
      )}
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
