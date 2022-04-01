import React, { useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { Person } from "../../Interfaces/housingSearchInterfaces";

const SearchView = (): JSX.Element => {
  const [results, setResults] = useState<Person[]>();
  return (
    <>
      <h1 className="lbh-heading-h1">Welcome to Single View 2.0</h1>
      <SearchByResident setResultsFunction={setResults} />
      {results && <SearchResults searchResults={results} />}
    </>
  );
};

const setResults = (searchResults: Person[]) => {
  setResults(searchResults);
};

export default SearchView;
