import React from "react";
import { formatDate } from "@mfe/common/lib/utils";
import { housingSearchPerson } from "../Interfaces";
import { humanize } from "../Utils";

interface Props {
  results: housingSearchPerson[];
  selectMatch: (person: housingSearchPerson) => void;
}

export const SearchResultsGroup = (props: Props): JSX.Element => {
  return (
    <>
      {props.results.map((person: housingSearchPerson, index: number) => {
        return (
          <>
            <div className="lbh-body sv-result-wrapper" key={index}>
              {person.dataSource != "single-view" ? (
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
              ) : (
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
              )}
              <div className="sv-result">
                {person.dataSource == "single-view" ? (
                  <strong className="lbh-tag lbh-tag--green">Merged</strong>
                ) : (
                  <strong className="lbh-tag lbh-tag--grey">Unmerged</strong>
                )}
                &nbsp;
                <a
                  href={`/customers/${person.dataSource}/${person.id}`}
                  className="lbh-link lbh-link--no-visited-state"
                >
                  {person.firstName} {person.surName}
                  {person.dateOfBirth &&
                    ", Date of Birth: " + formatDate(person.dateOfBirth)}
                </a>
                <div className="lbh-body-s govuk-!-margin-top-1">
                  {humanize(person.dataSource)} ID: {person.id}
                  <br />
                  {person.knownAddresses?.length > 0
                    ? person.knownAddresses.map((address) => {
                        return address.fullAddress + " ";
                      })
                    : "(Address Not Set)"}
                  {/* <br />
                  {person.niNo != null
                    ? "NI Number: " + person.niNo
                    : "(NI Number Not Set)"}
                  <br /> */}
                  <strong className="lbh-tag lbh-tag--grey">
                    {humanize(person.dataSource)}
                  </strong>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
