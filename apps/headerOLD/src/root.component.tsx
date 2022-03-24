import React from "react";

import { ConfirmationRouter } from "@mtfh/common/lib/components";

import App from "./app";

const Root = (): JSX.Element => (
  <ConfirmationRouter>
    <App />
  </ConfirmationRouter>
);

export default Root;
