import React from "react";
import { getCookie } from "../Utils";

export const BackToSearch = () => {
  const path = getCookie("searchResidentPath");
  return (
    <>
      <a href={path} id={"back-to-search"} className={"govuk-back-link"}>
        Back To Search
      </a>
    </>
  );
};