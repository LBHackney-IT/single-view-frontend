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

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

export const SearchResults = (props: myProps): JSX.Element => {
  const forceUpdate = useForceUpdate();
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
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(() => {
    setMergeError(null);
    setResults(sliceIntoChunks(props.otherResults, props.maxSearchResults)[0]);
    setSelectedRecords([]);
    setMatchedResults(props.matchedResults);
  }, [props.otherResults, props.matchedResults, props.maxSearchResults]);

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
        {mergeError && (
          <ErrorSummary
            id="singleViewMergeError"
            title="Error"
            description={mergeError}
          />
        )}
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
                forceUpdate={forceUpdate}
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
                forceUpdate={forceUpdate}
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
