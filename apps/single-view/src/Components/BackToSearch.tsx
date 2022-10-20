import React from "react";
import { getCookie } from "../Utils";

export const BackToSearch = () => {
  const path = getCookie("searchResidentPath") || "/search";
  return (
    <>
      <a
        href={path}
        id={"back-to-search"}
        className={"govuk-back-link lbh-link lbh-link--no-visited-state"}
      >
        Back to search results
      </a>
    </>
  );
};
