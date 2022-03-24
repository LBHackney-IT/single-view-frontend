import React from "react";
import ReactDOM from "react-dom";

import singleSpaReact from "single-spa-react";

import { ErrorSummary } from "@mtfh/common/lib/components";

import Root from "./root.component";
import "./root.styles.scss";

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    console.log(err);
    console.log(info);
    console.log(props);
    return (
      <ErrorSummary
        id="mtfh-personal-details"
        title="Error"
        description="Unable to load header"
      />
    );
  },
});
