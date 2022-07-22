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
import { isProduction } from "./Utils/isProduction";

const App = (): JSX.Element => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("lbh-frontend").initAll();
    }
  }, []);

  const hasInteractedWithJigsaw = (): boolean => {
    const dismissed = document.cookie.indexOf("jigsawDismissed=true") !== -1;
    const jigsawTokenSet = document.cookie.indexOf("jigsawToken=") !== -1;

    return dismissed || jigsawTokenSet;
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect
              to={hasInteractedWithJigsaw() ? "/search" : "jigsawLogin"}
            />
          </Route>
          <Route path="/search">
            {hasInteractedWithJigsaw() ? <SearchView /> : <JigsawLoginView />}
          </Route>
          <Route path="/jigsawLogin">
            <JigsawLoginView />
          </Route>
          <Route path="/customers/:dataSource/:id">
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
