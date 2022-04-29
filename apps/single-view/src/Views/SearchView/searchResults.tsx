import React from "react";
import { formatDateOfBirth } from "../../Utils/formatDates";
import { housingSearchPerson } from "../../Interfaces";

interface myProps {
  searchResults: housingSearchPerson[];
}

export const SearchResults = (props: myProps): JSX.Element => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h2 className="lbh-heading-h3">{`${props.searchResults.length} results found`}</h2>
        <hr />
        <div id="searchResults">
          {props.searchResults.map(
            (person: housingSearchPerson, index: number) => {
              return (
                <div className="lbh-body" key={index}>
                  <a
                    href={`/customers/${person.id}`}
                    className="lbh-link lbh-link--no-visited-state"
                  >
                    {person.firstName} {person.surName}, Date of Birth:{" "}
                    {formatDateOfBirth(person.dateOfBirth)}
                  </a>
                  <div className="lbh-body-s">
                    {person.knownAddresses.map((tenure) => {
                      return tenure.fullAddress;
                    })}
                    <br />
                    Person API id: {person.id}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
