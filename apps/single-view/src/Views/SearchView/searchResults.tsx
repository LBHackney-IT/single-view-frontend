import React, { useState } from "react";
import { housingSearchPerson } from "../../Interfaces";
import { formatDate } from "@mfe/common/lib/utils";
import { Pagination } from "../../Components";

interface myProps {
  searchResults: housingSearchPerson[];
  maxSearchResults: number;
}

export const SearchResults = (props: myProps): JSX.Element => {
  const sliceIntoChunks = (arr: any, chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };
  const [splitResults] = useState<housingSearchPerson[][]>(
    sliceIntoChunks(props.searchResults, props.maxSearchResults)
  );
  const [results, setResults] = useState<housingSearchPerson[]>(
    splitResults[0]
  );
  const [allResults] = useState<housingSearchPerson[]>(props.searchResults);

  const filterSystem = (dataSource: string) => {
    if (dataSource == "All") {
      return setResults(results);
    }
    return setResults(results.filter((p) => p.dataSource == dataSource));
  };

  const onPageChange = (currentPage: number, isNext: boolean) => {
    if (isNext) {
      setResults(splitResults[currentPage]);
    } else {
      setResults(splitResults[currentPage - 2]);
    }
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h2 className="lbh-heading-h3">{`${allResults.length} results found`}</h2>
        <div className="govuk-form-group lbh-form-group">
          <label className="govuk-label lbh-label" htmlFor="system-filter">
            Filter by system
          </label>
          <select
            className="govuk-select lbh-select"
            id="system-filter"
            name="system-filter"
            onChange={(e) => filterSystem(e.target.value)}
          >
            <option defaultValue="all">All</option>
            <option value="HousingSearchApi">Housing Search</option>
            <option value="Jigsaw">Jigsaw</option>
          </select>
        </div>
        <hr />
        <div id="searchResults">
          {results.map((person: housingSearchPerson, index: number) => {
            return (
              <div className="lbh-body sv-result-wrapper" key={index}>
                <div className="govuk-checkboxes lbh-checkboxes">
                  <div className="govuk-checkboxes_item">
                    <input
                      className="govuk-checkboxes_input sv-checkboxes"
                      id="match"
                      name="match"
                      type="checkbox"
                      value="match"
                    />
                  </div>
                </div>
                <div className="sv-result">
                  <a
                    href={`/customers/${person.dataSource}/${person.id}`}
                    className="lbh-link lbh-link--no-visited-state"
                  >
                    {person.firstName} {person.surName}
                    {person.dateOfBirth &&
                      ", Date of Birth: " + formatDate(person.dateOfBirth)}
                  </a>
                  <div className="lbh-body-s">
                    {person.knownAddresses.map((address) => {
                      return address.fullAddress;
                    })}
                    <br />
                    {person.dataSource == "HousingSearchApi"
                      ? "Person API"
                      : "Jigsaw"}{" "}
                    id: {person.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          total={allResults.length}
          onPageChange={onPageChange}
          pageSize={props.maxSearchResults}
        />
      </div>
    </div>
  );
};
