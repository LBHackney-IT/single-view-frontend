import React, { useState } from "react";
import { unmergeRecords } from "../Gateways/recordsGateway";

interface Props {
  svId: string;
}

export const UnmergeRecordButton: React.FC<Props> = (props) => {
  const [searching, setIsSearching] = useState<boolean>(false);
  return searching ? (
    <div className="sv-spinner">
      <svg
        viewBox="0 0 42 42"
        stroke="#00703c"
        width="50"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(3 3)" stroke-width="5">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
            <path
              d="M36 18c0-9.94-8.06-18-18-18"
              transform="rotate(112.708 18 18)"
            />
          </g>
        </g>
      </svg>
    </div>
  ) : (
    <button
      onClick={() => {
        setIsSearching(true);
        var hasUnmerged = unmergeRecords(props.svId);
        setIsSearching(false);
      }}
      className="govuk-button lbh-button govuk-button--start"
    >
      Unmerge Record
      <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    </button>
  );
};
