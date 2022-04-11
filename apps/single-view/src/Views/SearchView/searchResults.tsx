import React from "react";
import { formatDateOfBirth } from "../../Utils/formatDateOfBirth";
import { Person } from "../../Interfaces";

interface myProps {
  searchResults: Person[];
}

export const SearchResults = (props: myProps): JSX.Element => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h2 className="lbh-heading-h3">{`${props.searchResults.length} results found`}</h2>
        <hr />
        <div id="searchResults">
          {props.searchResults.map((person: Person, index: number) => {
            return (
              <div key={index}>
                <a
                  href={`/customers/${person.id}`}
                  className="lbh-link lbh-link--no-visited-state no-underline"
                >
                  {person.firstname} {person.surname}, Date of Birth:{" "}
                  {formatDateOfBirth(person.dateOfBirth)}
                </a>
                <div className="lbh-body-s">
                  {person.tenures.map((tenure) => {
                    return tenure.assetFullAddress;
                  })}
                  <br />
                  Person API id: {person.id}
                </div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
