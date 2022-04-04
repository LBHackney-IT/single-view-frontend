import React, { useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { Person } from "../../Interfaces/housingSearchInterfaces";

export const SearchView = (): JSX.Element => {
  const [results, setResults] = useState<Person[]>();
  return (
    <>
      <h1 className="lbh-heading-h1">
        {results ? "Search results for" : "Search resident information"}
      </h1>
      <SearchByResident setResultsFunction={setResults} />
      {results && <SearchResults searchResults={results} />}
    </>
  );
};

const setResults = (searchResults: Person[]) => {
  setResults(searchResults);
};
