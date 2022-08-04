import React, { useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { housingSearchPerson, housingSearchResults } from "../../Interfaces";

interface Props {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  addressLine1: string | null;
  postCode: string | null;
}

export const SearchView = (props: Props): JSX.Element => {
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
      <SearchByResident
        setResultsFunction={setResultsFunction}
        firstName={props.firstName}
        lastName={props.lastName}
        addressLine1={props.addressLine1}
        postCode={props.postCode}
        dateOfBirth={props.dateOfBirth}
      />
      <div id="results">
        {results && (
          <SearchResults
            matchedResults={matchedResults}
            otherResults={results}
            maxSearchResults={10}
          />
        )}
      </div>
    </>
  );
};
