import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import { ErrorSummary } from "@mfe/common/lib/components";

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return (
      <ErrorSummary
        id="mtfh-personal-details"
        title="Error"
        description="Unable to load app"
      />
    );
  },
});
