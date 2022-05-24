import React, { useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { housingSearchPerson } from "../../Interfaces";

export const SearchView = (): JSX.Element => {
  const [results, setResults] = useState<housingSearchPerson[]>();

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

const setResults = (searchResults: housingSearchPerson[]) => {
  setResults(searchResults);
};
