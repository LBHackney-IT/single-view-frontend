import React, { useState } from "react";
import { Person } from "../../Interfaces/housingSearchInterfaces";

interface myProps {
  searchResults: Person[];
}

export const SearchResults = (props: myProps): JSX.Element => {
  return (
    <div className="lbh-container">
      {props.searchResults.map((person: Person, index: number) => {
        return (
          <li key={index}>
            <a href={`/customers/${person.id}`}>
              {person.firstname} {person.surname},{" "}
              {person.tenures.map((tenure) => {
                return tenure.assetFullAddress;
              })}
            </a>
          </li>
        );
      })}
    </div>
  );
};
