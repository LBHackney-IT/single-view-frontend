import React from "react";

import { $auth, isAuthorised, login } from "@mtfh/common/lib/auth";
import {
  Button,
  ErrorSummary,
  Heading,
  Layout,
  Link,
  Text,
} from "@mtfh/common/lib/components";

import { REQUEST_ACCESS_LINK } from "../../constants";
import { locale } from "../../services";

export const LoginView = () => {
  const auth = $auth.getValue();
  return (
    <Layout>
      <Heading>{locale.signIn}</Heading>
      {!!auth.token && !isAuthorised() && (
        <ErrorSummary id="error-summary-title" title={locale.unauthorisedToViewService}>
          <p>
            {locale.contactToRequestPermission}{" "}
            <Link variant="link" href={REQUEST_ACCESS_LINK}>
              {locale.requestAccess}
            </Link>
          </p>
        </ErrorSummary>
      )}
      <Button onClick={() => login()} variant="chevron">
        {locale.signInUsingHackney}
      </Button>
      <Text>
        {locale.loginWithHackneyAccount}
        <br />
        {locale.managerSupport}
      </Text>
    </Layout>
  );
};
