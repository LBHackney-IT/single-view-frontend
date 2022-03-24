import React, { useEffect } from "react";
import { Prompt, PromptProps, useRouteMatch } from "react-router-dom";

export interface DialogPromptProps extends Omit<PromptProps, "message"> {
  title: string;
  body?: string;
  skipConfirmation?: (location: { pathname: string }) => boolean;
}

export const DialogPrompt = ({
  title,
  body,
  skipConfirmation,
  ...props
}: DialogPromptProps): JSX.Element => {
  const { path } = useRouteMatch();

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.returnValue = "";
      return e.returnValue as string;
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, []);

  return (
    <Prompt
      {...props}
      message={(location, action) => {
        if (skipConfirmation && skipConfirmation(location)) {
          return true;
        }
        return JSON.stringify({
          action,
          path,
          pathname: location.pathname,
          title,
          body: body || "",
        });
      }}
    />
  );
};
