import React, { useState } from "react";
import { unmergeRecords } from "../Gateways/recordsGateway";

interface Props {
  svId: string;
  setUnmergeError: () => void;
  unmergeRecordPersonId: (id: string) => void;
}

//component to unmerge
export const UnmergeRecordButton: React.FC<Props> = (props) => {
  const [searching, setIsSearching] = useState<boolean>(false);
  const deleteRecord = async () => {
    setIsSearching(true);
    var hasUnmerged = await unmergeRecords(props.svId);
    if (hasUnmerged) {
      window.location.reload();
    }
    setIsSearching(false);
  };
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
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path
              d="M36 18c0-9.94-8.06-18-18-18"
              transform="rotate(112.708 18 18)"
            />
          </g>
        </g>
      </svg>
    </div>
  ) : (
    <div className="sv-buttons-wrapper">
      <button
        onClick={() => {
          deleteRecord();
        }}
        className="govuk-button govuk-button--warning sv-unmerge-button"
        data-testid="confirm"
      >
        Confirm
      </button>
      <button
        onClick={() => {
          props.unmergeRecordPersonId("");
        }}
        className="govuk-button sv-unmerge-button govuk-!-margin-left-2"
        data-testid="cancel"
      >
        Cancel
      </button>
    </div>
  );
};
