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
              Request access
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
        Please log in with your Hackney email account.
        <br /> <br />
        If you have problems while signing in, you can try:
        <br />
        1) Using the Google Chrome web browser
        <br />
        2){" "}
        <a
          href="https://support.google.com/accounts/answer/32050"
          target="_blank"
          rel="noreferrer"
        >
          Deleting all browser cookies
        </a>{" "}
        ( press ctrl+shift+delete ) {" - "} Set "Time range" to "All time" and have
        "Cookies and other site data" selected
        <br />
        3) Signing in again after
        <br /> If this does not work, speak with a manager to verify your access.
      </Text>
    </Layout>
  );
};
