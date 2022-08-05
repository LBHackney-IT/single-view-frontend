import React, { useState, useEffect } from "react";
import { housingSearchPerson } from "../../Interfaces";
import { Pagination } from "../../Components";
import { mergeRecords } from "../../Gateways/mergeRecords";
import { ErrorSummary } from "@mfe/common/lib/components";
import { SearchResultsGroup } from "../../Components/SearchResultsGroup";

interface myProps {
  matchedResults: housingSearchPerson[] | undefined;
  otherResults: housingSearchPerson[];
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
    sliceIntoChunks(props.otherResults, props.maxSearchResults)
  );
  const [results, setResults] = useState<housingSearchPerson[]>(
    sliceIntoChunks(props.otherResults, props.maxSearchResults)[0]
  );
  const [matchedResults, setMatchedResults] = useState<housingSearchPerson[]>();

  const [selectedRecords, setSelectedRecords] = useState<housingSearchPerson[]>(
    []
  );
  const [mergeError, setMergeError] = useState<boolean>(false);

  useEffect(() => {
    setMergeError(false);
    setResults(sliceIntoChunks(props.otherResults, props.maxSearchResults)[0]);
    setSelectedRecords([]);
    setMatchedResults(props.matchedResults);
  }, [props.otherResults, props.matchedResults]);

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

  let numberOfResults = props.otherResults.length;

  if (props.matchedResults) {
    numberOfResults += props.matchedResults.length;
  }

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
          <h2 className="lbh-heading-h3 govuk-!-margin-top-7">{`${numberOfResults} results found`}</h2>
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
        <div id="matchedResults">
          {matchedResults &&
            matchedResults.length > 0 && [
              <h4 className="lbh-heading-h4">
                The following results were matched on name and date of birth, if
                provided:
              </h4>,
              <SearchResultsGroup
                results={matchedResults}
                selectMatch={selectMatch}
              />,
            ]}
        </div>
        <div id="searchResults">
          {results &&
            results.length > 0 && [
              <h4 className="lbh-heading-h4 govuk-!-margin-top-7">
                The following results were partial matches:
              </h4>,
              <SearchResultsGroup
                results={results}
                selectMatch={selectMatch}
              />,
            ]}
        </div>
        {numberOfResults > 0 && (
          <Pagination
            total={props.otherResults.length}
            onPageChange={onPageChange}
            pageSize={props.maxSearchResults}
          />
        )}
      </div>
    </div>
  );
};
