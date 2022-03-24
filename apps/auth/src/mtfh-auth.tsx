import React from "react";
import ReactDOM from "react-dom";

import singleSpaReact from "single-spa-react";

import { ErrorSummary } from "@mtfh/common/lib/components";

import Root from "./root.component";

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary() {
    return (
      <ErrorSummary
        id="mtfh-auth"
        title="Error"
        description="Unable to load authentication"
      />
    );
  },
});
