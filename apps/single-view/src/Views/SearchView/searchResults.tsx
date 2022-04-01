import React, { useState } from "react";
import { Person } from "../../Interfaces/housingSearchInterfaces";

interface myProps {
  searchResults: Person[];
}

export const SearchResults = (props: myProps): JSX.Element => {
  return <div>Search Results here: {props.searchResults}</div>;
};
