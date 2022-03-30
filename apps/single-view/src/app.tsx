import React, { useState } from "react";
import { SearchView } from "./Views/SearchView";

const App = (): JSX.Element => {
  const [hasSearched, setHasSearched] = useState(false);
  return (
    <>
      <h1 className="lbh-heading-h1">Welcome to Single View 2.0</h1>
      <SearchView />
    </>
  );
};

export default App;
