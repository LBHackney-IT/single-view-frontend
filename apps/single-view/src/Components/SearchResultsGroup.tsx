import React from "react";
import { formatDate } from "@mfe/common/lib/utils";
import { housingSearchPerson } from "../Interfaces";
import { UnmergeRecordButton } from "./UnmergeRecordButton";
import { isMergedRecord } from "../Utils/isMergedRecord";
import { searchPersonToUrl } from "../Utils/searchPersonToUrl";
import { searchPersonDataSource } from "../Utils/searchPersonDataSource";
import { humanize } from "../Utils/humanize";

interface Props {
  results: housingSearchPerson[];
  selectMatch: (person: housingSearchPerson) => void;
  setUnmergeError: () => void;
}

export const SearchResultsGroup = (props: Props): JSX.Element => {
  return (
    <>
      {props.results.map((person: housingSearchPerson, index: number) => {
        return (
          <>
            <div className="lbh-body sv-result-wrapper" key={index}>
              {isMergedRecord(person) ? (
                // This is a merged record (hidden checkbox)
                <div
                  className="govuk-checkboxes lbh-checkboxes"
                  style={{ visibility: "hidden" }}
                >
                  <div className="govuk-checkboxes_item">
                    <input
                      className="govuk-checkboxes_input sv-checkboxes"
                      id={`match-${person.id}`}
                      name="match"
                      type="checkbox"
                      value="match"
                      aria-label="match-checkbox"
                      checked={person.isSelected}
                      onChange={() => props.selectMatch(person)}
                    />
                  </div>
                </div>
              ) : (
                // This is an unmerged record (shown checkbox)
                <div className="govuk-checkboxes lbh-checkboxes">
                  <div className="govuk-checkboxes_item">
                    <input
                      className="govuk-checkboxes_input sv-checkboxes"
                      id={`match-${person.id}`}
                      name="match"
                      type="checkbox"
                      value="match"
                      aria-label="match-checkbox"
                      checked={person.isSelected}
                      onChange={() => props.selectMatch(person)}
                    />
                  </div>
                </div>
              )}
              <div className="sv-result">
                {isMergedRecord(person) ? (
                  <strong
                    data-testid={"dataSources" + index}
                    className="lbh-tag lbh-tag--green"
                  >
                    Merged ({person.dataSources.length})
                  </strong>
                ) : (
                  <strong className="lbh-tag lbh-tag--grey">Unmerged</strong>
                )}
                &nbsp;
                <a
                  href={searchPersonToUrl(person)}
                  className="lbh-link lbh-link--no-visited-state"
                >
                  {person.firstName} {person.surName}
                  {person.dateOfBirth &&
                    ", Date of Birth: " + formatDate(person.dateOfBirth)}
                </a>
                <div className="lbh-body-s govuk-!-margin-top-1">
                  {searchPersonDataSource(person)} ID: {person.id}
                  <br />
                  {person.knownAddresses?.length > 0
                    ? person.knownAddresses.map((address) => {
                        return address.fullAddress + " ";
                      })
                    : "(Address Not Set)"}
                  <br />
                  <span>
                    {Array.from(
                      new Set(person.dataSources.map((item: string) => item)) // Gets unique data source strings
                    ).map((dataSource: string, index: number) => {
                      return [
                        <strong
                          className="lbh-tag lbh-tag--grey"
                          key={index + 1}
                        >
                          {humanize(dataSource)}
                        </strong>,
                        <>{"    "}</>,
                      ];
                    })}
                  </span>
                </div>
              </div>
              {isMergedRecord(person) && (
                <UnmergeRecordButton
                  svId={person.id}
                  setUnmergeError={props.setUnmergeError}
                />
              )}
            </div>
          </>
        );
      })}
    </>
  );
};
