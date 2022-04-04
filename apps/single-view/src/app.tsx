import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CustomerView, SearchView } from "./Views";

import "./app.scss";

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
            <p className="lbh-body-s">Page not found</p>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
