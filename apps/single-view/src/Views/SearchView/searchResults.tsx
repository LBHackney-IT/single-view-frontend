import React, { useState, useEffect } from "react";
import { housingSearchPerson } from "../../Interfaces";
import { formatDate } from "@mfe/common/lib/utils";
import { humanize } from "../../Utils";
import { Pagination } from "../../Components";
import { mergeRecords } from "../../Gateways/mergeRecords";
import { ErrorSummary } from "@mfe/common/lib/components";

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
    sliceIntoChunks(props.searchResults, props.maxSearchResults)[0]
  );

  const [selectedRecords, setSelectedRecords] = useState<housingSearchPerson[]>(
    []
  );
  const [mergeError, setMergeError] = useState<boolean>(false);

  const filterSystem = (dataSource: string) => {
    if (dataSource == "All") {
      return setResults(splitResults[0]);
    }
    return setResults(
      splitResults[0].filter((p) => p.dataSource == dataSource)
    );
  };

  useEffect(() => {
    setMergeError(false);
    setResults(sliceIntoChunks(props.searchResults, props.maxSearchResults)[0]);
    setSelectedRecords([]);
  }, [props.searchResults]);

  const onPageChange = (currentPage: number, isNext: boolean) => {
    if (isNext) {
      setResults(splitResults[currentPage]);
    } else {
      setResults(splitResults[currentPage - 2]);
    }
  };

  const selectMatch = (person: housingSearchPerson) => {
    if (!person.isSelected) {
      person.isSelected = true;
      setSelectedRecords([...selectedRecords, person]);
    } else {
      setSelectedRecords(
        selectedRecords.filter((p) => {
          return p != person;
        })
      );
      person.isSelected = false;
    }
  };

  const mergeSelectedRecords = async (records: housingSearchPerson[]) => {
    try {
      setMergeError(false);
      const sv_id = await mergeRecords(records);
      return (window.location.href = `/customers/single-view/${sv_id}`);
    } catch (e) {
      setMergeError(true);
    }
  };

  if (mergeError) {
    return (
      <ErrorSummary
        id="singleViewMergeError"
        title="Error"
        description="Unable to create merged record. Please search again."
      />
    );
  }

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="sv-group">
          <h2 className="lbh-heading-h3 govuk-!-margin-top-7">{`${props.searchResults.length} results found`}</h2>
          <button
            id="match-button"
            disabled={selectedRecords?.length <= 1}
            className={
              selectedRecords?.length <= 1
                ? "govuk-button lbh-button lbh-button--disabled govuk-button--disabled"
                : "govuk-button lbh-button"
            }
            onClick={() => mergeSelectedRecords(selectedRecords)}
          >
            Merge {selectedRecords?.length} records
          </button>
        </div>
        <hr />
        <div id="searchResults">
          {results.map((person: housingSearchPerson, index: number) => {
            return (
              <div className="lbh-body sv-result-wrapper" key={index}>
                {person.dataSource != "single-view" && (
                  <div className="govuk-checkboxes lbh-checkboxes">
                    <div className="govuk-checkboxes_item">
                      <input
                        className="govuk-checkboxes_input sv-checkboxes"
                        id={`match-${person.id}`}
                        name="match"
                        type="checkbox"
                        value="match"
                        aria-label="match-checkbox"
                        checked={person.isSelected}
                        onChange={() => selectMatch(person)}
                      />
                    </div>
                  </div>
                )}
                <div className="sv-result">
                  <a
                    href={`/customers/${person.dataSource}/${person.id}`}
                    className="lbh-link lbh-link--no-visited-state"
                  >
                    {person.firstName} {person.surName}
                    {person.dateOfBirth &&
                      ", Date of Birth: " + formatDate(person.dateOfBirth)}
                  </a>
                  <div className="lbh-body-s govuk-!-margin-top-1">
                    {humanize(person.dataSource)} id: {person.id}
                    <br />
                    {person.knownAddresses?.length > 0
                      ? person.knownAddresses.map((address) => {
                          return address.fullAddress + " ";
                        })
                      : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          total={props.searchResults.length}
          onPageChange={onPageChange}
          pageSize={props.maxSearchResults}
        />
      </div>
    </div>
  );
};
