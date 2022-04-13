import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CustomerView, SearchView } from "./Views";

import "./app.scss";
import { NotFound } from "./Components";

const App = (): JSX.Element => {
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("lbh-frontend").initAll();
    }
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
          <Route path="/search">
            <SearchView />
          </Route>
          <Route path="/customers/:id">
            <CustomerView />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
