import React, { useState, useEffect } from "react";
import {
  housingSearchPerson,
  mapRecordsToMatchedRecord,
} from "../../Interfaces";
import { Pagination } from "../../Components";
import { mergeRecords } from "../../Gateways/recordsGateway";
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
  const [mergeError, setMergeError] = useState<string | null>(null);
  const [unMergeError, setUnmergeError] = useState<string | null>(null);

  const mergedRecords = props.matchedResults?.filter(
    (matchedResult) => matchedResult.isMergedSingleViewRecord
  );
  const matchedResultsWithoutMergedRecords = props.matchedResults?.filter(
    (matchedResult) => !matchedResult.isMergedSingleViewRecord
  );

  useEffect(() => {
    setMergeError(null);
    setUnmergeError(null);
    setResults(sliceIntoChunks(props.otherResults, props.maxSearchResults)[0]);
    setSelectedRecords([]);
    setMatchedResults(matchedResultsWithoutMergedRecords);
  }, [props.otherResults, props.matchedResults, props.maxSearchResults]);

  const onPageChange = (currentPage: number, isNext: boolean) => {
    if (isNext) {
      setResults(splitResults[currentPage]);
    } else {
      setResults(splitResults[currentPage - 2]);
    }
  };

  const displayUnmergeError = () => {
    setUnmergeError("Error unmerging selected record. Please try again.");
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
    const mappedMatchedRecord = mapRecordsToMatchedRecord(records);
    if (mappedMatchedRecord.error != null) {
      // @ts-ignore
      return setMergeError(mappedMatchedRecord.error);
    }
    try {
      setMergeError(null);
      // @ts-ignore
      const sv_id = await mergeRecords(mappedMatchedRecord.matchedRecord);
      return (window.location.href = `/customers/single-view/${sv_id}`);
    } catch (e) {
      setMergeError("Unable to create merged record. Please search again.");
    }
  };

  let numberOfResults = props.otherResults.length;

  if (props.matchedResults) {
    numberOfResults += props.matchedResults.length;
  }

  function clearSearchFields() {
    // window.history.pushState({}, document.title, "/search");
    const fieldIds = [
      "firstName",
      "lastName",
      "addressLine1",
      "postCode",
      "dateOfBirth",
    ];
    for (let i = 0; i < fieldIds.length; i++) {
      let field = document.getElementById(fieldIds[i]) as HTMLInputElement;
      if (field) {
        field.value = "";
      }
    }
    const header = document.getElementById(
      "single-spa-application:@mfe/header"
    );
    header && header.scrollIntoView();
  }

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="sv-group">
          <h2 className="lbh-heading-h3 govuk-!-margin-top-7">{`${numberOfResults} results found`}</h2>
          <button
            id={"clearSearchButton"}
            data-testid={"clearSearchButton"}
            style={{ marginRight: 30 }}
            className="govuk-button lbh-button"
            onClick={() => {
              clearSearchFields();
            }}
          >
            Clear Search
          </button>
          <button
            id="match-button"
            data-testid={"match-button"}
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
        {mergeError && (
          <ErrorSummary
            id="singleViewMergeError"
            title="Error"
            description={mergeError}
          />
        )}
        {unMergeError && (
          <ErrorSummary
            id="singleViewMergeError"
            title="Error"
            description={unMergeError}
          />
        )}
        <hr />

        <div id="mergedRecords">
          {mergedRecords &&
            mergedRecords.length > 0 && [
              <h4 className="lbh-heading-h4">
                The following results were merged and saved in single view:
              </h4>,
              <SearchResultsGroup
                results={mergedRecords}
                selectMatch={selectMatch}
                setUnmergeError={displayUnmergeError}
              />,
            ]}
        </div>

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
                setUnmergeError={displayUnmergeError}
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
                setUnmergeError={displayUnmergeError}
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
