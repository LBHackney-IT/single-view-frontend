import React, { useState } from "react";
import { $auth } from "@mfe/common/lib/auth";

const App = (): JSX.Element => {
  const [auth, setAuth] = useState($auth.getValue());

  return (
    <>
      <h1 className="lbh-heading-h1">Welcome to Single View 2.0</h1>
      <p className="govuk-body">
        You are signed in as {auth.name} {"<"}
        {auth.email}
        {">"}
      </p>
      <h5>Groups</h5>
      <ul className="lbh-list">
        {auth.groups.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </>
  );
};

export default App;
