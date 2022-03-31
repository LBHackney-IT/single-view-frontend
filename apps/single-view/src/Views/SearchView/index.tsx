import React from "react";
import { SearchByResident } from "./searchByResident";

const SearchView = (): JSX.Element => {
  return (
    <>
      <h1 className="lbh-heading-h1">Welcome to Single View 2.0</h1>
      <SearchByResident />
    </>
  );
};

export default SearchView;
