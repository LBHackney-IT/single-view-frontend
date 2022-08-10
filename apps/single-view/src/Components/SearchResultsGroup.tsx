import React from "react";
import { formatDate } from "@mfe/common/lib/utils";
import { housingSearchPerson, SingleView } from "../Interfaces";
import { humanize } from "../Utils";
import { UnmergeRecordButton } from "./UnmergeRecordButton";

interface Props {
  results: housingSearchPerson[];
  selectMatch: (person: housingSearchPerson) => void;
  forceUpdate: () => void;
}

export const SearchResultsGroup = (props: Props): JSX.Element => {
  return (
    <>
      {props.results.map((person: housingSearchPerson, index: number) => {
        return (
          <>
            <div className="lbh-body sv-result-wrapper" key={index}>
              {person.dataSource != "single-view" && (
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
                <a
                  href={`/customers/${person.dataSource}/${person.id}`}
                  className="lbh-link lbh-link--no-visited-state"
                >
                  {person.firstName} {person.surName}
                  {person.dateOfBirth &&
                    ", Date of Birth: " + formatDate(person.dateOfBirth)}
                </a>
                <div className="lbh-body-s govuk-!-margin-top-1">
                  {humanize(person.dataSource)} id: {person.id}
                  <br />
                  {person.knownAddresses?.length > 0
                    ? person.knownAddresses.map((address) => {
                        return address.fullAddress + " ";
                      })
                    : ""}
                </div>
              </div>
              {person.dataSource == SingleView && (
                <UnmergeRecordButton
                  svId={person.id}
                  forceUpdate={props.forceUpdate}
                />
              )}
            </div>
          </>
        );
      })}
    </>
  );
};
