import React, { useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";

const SearchView = (): JSX.Element => {
  const [results, setResults] = useState("");
  return (
    <>
      <h1 className="lbh-heading-h1">Welcome to Single View 2.0</h1>
      <SearchByResident setResultsFunction={setResults} />
      {results && <SearchResults results={results} />}
    </>
  );
};

const setResults = (results: string) => {
  setResults(results);
};

export default SearchView;
