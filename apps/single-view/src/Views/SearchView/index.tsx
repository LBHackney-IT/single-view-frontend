import React, { useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { housingSearchPerson } from "../../Interfaces";

export const SearchView = (): JSX.Element => {
  const [results, setResults] = useState<housingSearchPerson[]>();

  const setResultsFunction = (searchResults: housingSearchPerson[]) => {
    setResults(searchResults);
  };

  return (
    <>
      <h1 className="lbh-heading-h1">
        {results ? "Search results for" : "Search resident information"}
      </h1>
      <SearchByResident setResultsFunction={setResultsFunction} />
      {results && (
        <SearchResults searchResults={results} maxSearchResults={10} />
      )}
    </>
  );
};
