import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { isAuthorised } from "@mtfh/common/lib/auth";
import { ConfirmationRouter } from "@mtfh/common/lib/components";

import { LoginView } from "./views";

const Root = (): JSX.Element | null => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthorised()) {
      history.push("/search");
    }
  }, [history]);

  return (
    <ConfirmationRouter>
      <LoginView />
    </ConfirmationRouter>
  );
};

export default Root;
