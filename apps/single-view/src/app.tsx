import React, { useState } from "react";
import { $auth } from "@mtfh/common/lib/auth";
import { SearchView } from "./views/search";

const App = (): JSX.Element => {
  const [auth, setAuth] = useState($auth.getValue());

  return (
    <>
      <h1 className="lbh-heading-h1">Welcome to Single View 2.0</h1>
      <SearchView />
    </>
  );
};

export default App;
