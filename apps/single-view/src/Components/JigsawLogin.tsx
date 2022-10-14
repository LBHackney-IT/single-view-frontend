import React, { useState } from "react";
import { authoriseJigsaw } from "../Gateways/Jigsaw";
import { Input } from "./index";

import Cookies from "js-cookie";

export const JigsawLogin = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState(false);

  const login = async (): Promise<string | void> => {
    if (username && password) {
      return await authoriseJigsaw(username, password);
    }
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (username && password) {
      setUsernameError(false);
      setPasswordError(false);
      Promise.resolve(login())
        .then((token) => {
          let date = new Date();
          date.setTime(date.getTime() + 10 * 60 * 60 * 1000);

          Cookies.set("jigsawToken", `${token}`, { path: "/", expires: date });

          const params = new URLSearchParams(window.location.search);
          const redirectUrl = params.get("redirect");
          document.location = redirectUrl !== null ? redirectUrl : "/";
        })
        .catch((reason) => {
          console.error(reason.message);
          setFormError(true);
        });
    }
  };

  const dismiss = () => {
    let date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `jigsawDismissed=true; expires=${date.toUTCString()}`;
  };

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div
            className="govuk-notification-banner"
            aria-labelledby="govuk-notification-banner-title"
            data-module="govuk-notification-banner"
          >
            <div className="govuk-notification-banner__header">
              <h2
                className="govuk-notification-banner__title"
                id="govuk-notification-banner-title"
              >
                Important
              </h2>
            </div>
            <div className="govuk-notification-banner__content">
              Please use your Jigsaw username & password to log in, granting you
              access to the data presented in Single view from Jigsaw.
              <br />
              <a
                href="/search"
                className="govuk-link lbh-link--no-visited-state"
                onClick={dismiss}
                data-testid="dismiss-jigsaw-login"
              >
                I don’t have access to Jigsaw.
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          {formError && (
            <div
              className="govuk-error-summary"
              aria-labelledby="error-summary-title"
              role="alert"
              data-module="govuk-error-summary"
            >
              <h2
                className="govuk-error-summary__title"
                id="error-summary-title"
              >
                There is a problem
              </h2>
              <div className="govuk-error-summary__body">
                Please ensure that you have entered your credentials correctly
              </div>
            </div>
          )}
          <form action="" onSubmit={(e) => submit(e)}>
            <Input
              label="Username"
              errorMsg="Username is mandatory"
              id="username"
              name="username"
              type="text"
              error={usernameError}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              errorMsg="Password is mandatory"
              id="password"
              name="password"
              type="password"
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="govuk-button lbh-button govuk-!-margin-bottom-5"
              data-module="govuk-button"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
