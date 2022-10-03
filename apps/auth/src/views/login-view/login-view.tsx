import React from "react";

import { $auth, isAuthorised } from "@mfe/common/lib/auth";
import {
  Button,
  ErrorSummary,
  Heading,
  Layout,
  Link,
  Text,
} from "@mfe/common/lib/components";

import { REQUEST_ACCESS_LINK } from "../../constants";
import { locale } from "../../services";

function login(redirectUrl = `${window.location.origin}/search`) {
  window.location.href = `${locale.authDomain}/auth?redirect_uri=${encodeURIComponent(
    redirectUrl,
  )}`;
}

export const LoginView = () => {
  if (window.location.pathname !== "/") {
    window.location.assign("/");
  }
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
      <Button
        onClick={() => login()}
        variant="chevron"
        data-testid="hackney-login-button"
      >
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
