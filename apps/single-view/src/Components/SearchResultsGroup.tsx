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
  const isNullOrEmpty = (data: string | null): boolean =>
    data == null || data == "";

  return (
    <>
      {props.results.map((person: housingSearchPerson, index: number) => {
        const mergedRecord = isMergedRecord(person);

        const dataSourceId = (
          <span>
            {searchPersonDataSource(person)} ID: {person.id} <br />
          </span>
        );

        const niNumberForMergedRecords = isNullOrEmpty(person.niNumber) ? (
          ""
        ) : (
          <span>
            NI Number: {person.niNumber} <br />
          </span>
        );

        const niNumberForUnmergedRecords = isNullOrEmpty(person.niNumber) ? (
          <span>
            (NI Number Not Set) <br />
          </span>
        ) : (
          <span>
            NI Number: {person.niNumber} <br />
          </span>
        );

        const address =
          person.knownAddresses?.length > 0 ? (
            person.knownAddresses.map((address) => {
              return (
                <span>
                  {" "}
                  {address.fullAddress} <br />{" "}
                </span>
              );
            })
          ) : (
            <span>
              (Address Not Set) <br />
            </span>
          );

        return (
          <>
            <div className="lbh-body sv-result-wrapper" key={index}>
              <div className="sv-result-sub-wrapper">
                {!mergedRecord && (
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
                  {mergedRecord ? (
                    <strong
                      data-testid={"mergeCounter-" + index}
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
                    {!mergedRecord && dataSourceId}
                    {mergedRecord
                      ? niNumberForMergedRecords
                      : niNumberForUnmergedRecords}
                    {!mergedRecord && address}
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
              </div>

              {mergedRecord && (
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
