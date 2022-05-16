import React, { useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { housingSearchPerson } from "../../Interfaces";
import { JigsawLogin } from "../../Components";

export const SearchView = (): JSX.Element => {
  const [results, setResults] = useState<housingSearchPerson[]>();
  const dismissed = document.cookie
    .split("; ")
    .find((c) => c == "jigsawDismissed=true");

  return (
    <>
      {!dismissed && (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <JigsawLogin />
          </div>
        </div>
      )}
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
