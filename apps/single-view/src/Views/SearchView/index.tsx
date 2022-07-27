import React, { useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { housingSearchPerson, housingSearchResults } from "../../Interfaces";

export const SearchView = (): JSX.Element => {
  const [matchedResults, setMatchedResults] = useState<housingSearchPerson[]>();
  const [results, setResults] = useState<housingSearchPerson[]>();

  const setResultsFunction = (searchResults: housingSearchResults) => {
    setMatchedResults(searchResults.matchedResults);
    setResults(searchResults.otherResults);
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
