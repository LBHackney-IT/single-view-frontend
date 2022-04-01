import React from "react";
import { formatDateOfBirth } from "../../Utils/formatDateOfBirth";
import { Person } from "../../Interfaces/housingSearchInterfaces";

interface myProps {
  searchResults: Person[];
}

export const SearchResults = (props: myProps): JSX.Element => {
  return (
    <div className="lbh-container">
      <h2 className="lbh-heading-h3">{`${props.searchResults.length} results found`}</h2>
      {props.searchResults.map((person: Person, index: number) => {
        return (
          <ul className="lbh-body" key={index}>
            <a
              href={`/customers/${person.id}`}
              className="lbh-link lbh-link--no-visited-state"
            >
              {person.firstname} {person.surname}, Date of Birth:{" "}
              {formatDateOfBirth(person.dateOfBirth)}
            </a>
            <div className="lbh-body-s">
              {person.tenures.map((tenure) => {
                return tenure.assetFullAddress;
              })}
            </div>
          </ul>
        );
      })}
    </div>
  );
};
