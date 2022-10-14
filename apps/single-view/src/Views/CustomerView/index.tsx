import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { Notes } from "./Notes";
import { getPerson } from "../../Gateways";
import {
  customerProfile,
  UrlParams,
  SystemId,
  customerResponse,
  Jigsaw,
  Housing,
} from "../../Interfaces";
import { NotFound } from "../../Components";
import { Cases } from "./Cases";
import { BackToSearch } from "../../Components/BackToSearch";
import { locale } from "../../Config/locale";

function setTitleByTab() {
  const personPageTitles = locale.pageTitles.personProfile;
  switch (window.location.hash) {
    case "":
    case "#profile":
      document.title = personPageTitles.profile;
      break;
    case "#notes":
      document.title = personPageTitles.notes;
      break;
    case "#cases":
      document.title = personPageTitles.cases;
      break;
  }
}

export const CustomerView = () => {
  useLayoutEffect(() => {
    setTitleByTab();
  });
  useEffect(() => {
    loadPerson();
  }, []);
  let { dataSource, id } = useParams<UrlParams>();
  const [person, setPerson] = useState<customerProfile | null>();
  const [mmhUrl, setMhUrl] = useState<string>("");
  const [jigsawUrl, setJigsawUrl] = useState<string>("");
  const [jigsawId, setJigsawId] = useState<string>("");
  const [dataSourceError, setDataSourceError] =
    useState<Array<SystemId> | null>();
  const [systemIds, setSystemIds] = useState<Array<SystemId>>();
  const isNullOrEmpty = (item: string): boolean => item == null || item == "";

  dataSource = dataSource.toLowerCase(); // Makes url parameter case insensitive
  const loadPerson = async (): Promise<customerResponse | null> => {
    try {
      let person = await getPerson(dataSource, id);
      setPerson(person?.customer);
      setSystemIds(person?.systemIds);
      setDataSourceError(person?.systemIds.filter((id: SystemId) => id.error));
      if (dataSource == Jigsaw) {
        setJigsawId(id);
        setJigsawUrl(`${process.env.JIGSAW_URL}/customers/customer/${id}`);
      } else {
        var jigsawId = person?.systemIds.find(
          (id: SystemId) => id.systemName.toLowerCase() == Jigsaw
        );
        if (jigsawId) {
          setJigsawId(jigsawId.id);
          setJigsawUrl(
            `${process.env.JIGSAW_URL}/customers/customer/${jigsawId?.id}`
          );
        } else {
          setJigsawId("jigsaw id not found");
        }
      }

      var mmhId = person?.systemIds?.find(
        (id: SystemId) => id.systemName.toLowerCase() == Housing
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
          <span
            className="govuk-warning-text__assistive"
            data-testid="jigsawInformationNotDisplayedBanner"
          >
            Warning
          </span>
          Some information from {dataSource.systemName} may not be displayed.{" "}
          {ifJigsaw ? jigsawLink : ` Reason: ${dataSource.error}`}
        </strong>
      </div>
    );
  };

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
          className="govuk-link lbh-link lbh-link--no-visited-state align-right govuk-!-margin-left-2"
          href={mmhUrl}
          target="_blank"
        >
          View on MMH
        </a>
      )}

      {jigsawUrl && (
        <a
          className="govuk-link lbh-link lbh-link--no-visited-state align-right govuk-!-margin-left-2"
          href={jigsawUrl}
          target="_blank"
        >
          View on Jigsaw
        </a>
      )}

      <div className="govuk-tabs lbh-tabs sv-space-t" data-module="govuk-tabs">
        <h2 className="govuk-tabs__title">Contents</h2>

        <div className="govuk-!-margin-bottom-5">
          <BackToSearch />
          <a
            href="/"
            id="new-search"
            className={
              "govuk-link lbh-link lbh-link--no-visited-state govuk-!-margin-left-2"
            }
          >
            New search
          </a>
        </div>

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
              Active Homelessness Case{" "}
              {isNullOrEmpty(jigsawId) || jigsawId == "jigsaw id not found"
                ? ""
                : `(${jigsawId})`}
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
          <Cases customerId={jigsawId} />
        </section>
      </div>
    </>
  );
};
