import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CustomerView, SearchView, JigsawLoginView } from "./Views";

import "./app.scss";
import { NotFound } from "./Components";

const App = (): JSX.Element => {
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("lbh-frontend").initAll();
    }
  }, []);

  const homeRedirect = () => {
    const dismissed = document.cookie
      .split("; ")
      .find((c) => c == "jigsawDismissed=true");

    const jigsawCookieSet = false; // need to check for it properly

    if (dismissed || jigsawCookieSet) {
      return "/search";
    }

    return "/jigsawLogin";
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={homeRedirect()} />
          </Route>
          <Route path="/search">
            <SearchView />
          </Route>
          <Route path="/jigsawLogin">
            <JigsawLoginView />
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
