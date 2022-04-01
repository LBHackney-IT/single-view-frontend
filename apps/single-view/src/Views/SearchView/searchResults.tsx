import React, { useState } from "react";

interface myProps {
  results: string;
}

export const SearchResults = (props: myProps): JSX.Element => {
  return <div>Search Results here: {props.results}</div>;
};
