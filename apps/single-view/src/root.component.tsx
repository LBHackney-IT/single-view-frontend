import React from "react";
import App from "./app";
import { ConfirmationRouter } from "@mfe/common/lib/components";

const Root = (): JSX.Element => (
  <ConfirmationRouter>
    <App />
  </ConfirmationRouter>
);

export default Root;
