import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SearchView from "./Views/SearchView";

const App = (): JSX.Element => {
  const [hasSearched, setHasSearched] = useState(false);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
          <Route exact path="/search">
            <SearchView />
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
