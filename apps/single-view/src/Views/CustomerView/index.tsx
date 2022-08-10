import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import { getPerson } from "../../Gateways";
import {
  customerProfile,
  UrlParams,
  customerResponse,
  Jigsaw,
  Housing,
} from "../../Interfaces";
import { NotFound } from "../../Components";
import { SystemId } from "../../Interfaces/systemIdInterface";
import { Cases } from "./Cases";

export const CustomerView = () => {
  const { dataSource, id } = useParams<UrlParams>();
  const [person, setPerson] = useState<customerProfile | null>();
  const [mmhUrl, setMhUrl] = useState<string>("");
  const [jigsawId, setJigsawId] = useState<string>("");
  const [dataSourceError, setDataSourceError] =
    useState<Array<SystemId> | null>();
  const [systemIds, setSystemIds] = useState<Array<SystemId>>();
  const nullOrEmpty = (item: string): boolean => item == null || item == "";

  const loadPerson = async (): Promise<customerResponse | null> => {
    try {
      let person = await getPerson(dataSource, id);
      setPerson(person?.customer);
      setSystemIds(person?.systemIds);
      setDataSourceError(person?.systemIds?.filter((id: SystemId) => id.error));
      if (dataSource == Jigsaw) {
        setJigsawId(id);
      } else {
        var jigsawId = person?.systemIds.find(
          (id: SystemId) => id.systemName == Jigsaw
        );
        if (jigsawId) setJigsawId(jigsawId.id);
      }

      var mmhId = person?.systemIds?.find(
        (id: SystemId) => id.systemName == Housing
      );
      if (mmhId) {
        setMhUrl(`${process.env.MMH_URL}/person/${mmhId.id}`);
      }
      return person;
    } catch (e) {
      setPerson(null);
      throw e;
    }
  };

  const systemIdError = (dataSource: any) => {
    const ifJigsaw =
      dataSource.systemName == Jigsaw && dataSource.error == "Unauthorised";
    const jigsawLink = <span>If you have access to Jigsaw, please login.</span>;

    return (
      <div
        className="govuk-warning-text lbh-warning-text govuk-!-margin-bottom-2"
        key={dataSource.id}
      >
        <span className="govuk-warning-text__icon" aria-hidden="true">
          !
        </span>
        <strong className="govuk-warning-text__text">
          <span className="govuk-warning-text__assistive">Warning</span>
          Some information from {dataSource.systemName} may not be displayed.{" "}
          {ifJigsaw ? jigsawLink : ` Error: ${dataSource.error}`}
        </strong>
      </div>
    );
  };

  useEffect(() => {
    loadPerson();
  }, []);

  return person === null ? (
    <NotFound />
  ) : (
    <>
      {dataSourceError && (
        <div style={{ marginTop: "-45px" }}>
          {dataSourceError.map((dataSource) => {
            return systemIdError(dataSource);
          })}
        </div>
      )}
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
          <li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
            <a className="govuk-tabs__tab" href="#cases">
              Active Homelessness Case
            </a>
          </li>
        </ul>

        <section className="govuk-tabs__panel" id="profile">
          <Profile profile={person} systemIds={systemIds} />
        </section>
        <section className="govuk-tabs__panel" id="notes">
          <Notes
            systemIds={systemIds}
            isHousing={person?.dataSource == "PersonAPI"}
          />
        </section>
        <section className="govuk-tabs__panel" id="cases">
          {nullOrEmpty(jigsawId) ? (
            <p
              className="govuk-inset-text lbh-inset-text"
              data-testid="homelessnessCasesNotFound"
            >
              There were no active homelessness cases found for this customer.
            </p>
          ) : (
            <Cases customerId={jigsawId} />
          )}
        </section>
      </div>
    </>
  );
};
