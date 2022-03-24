import React, { Dispatch, FC, useCallback, useState } from "react";
import { BrowserRouter, BrowserRouterProps, matchPath } from "react-router-dom";

import { Button } from "../button";
import { Dialog, DialogActions } from "../dialog";
import { Link } from "../link";
import { ScrollToTop } from "../scroll-to-top";

interface ConfirmationMessage {
  path: string;
  pathname: string;
  action: "POP" | "PUSH";
  title: string;
  body?: string;
}

export const ConfirmationRouter: FC<BrowserRouterProps> = ({
  children,
  ...props
}): JSX.Element => {
  const [message, setMessage] = useState<ConfirmationMessage>();
  const [isConfirm, setIsConfim] = useState(false);
  const [confirmation, setConfirmation] = useState<Dispatch<boolean>>();

  const onConfirmation = useCallback(
    (ok: boolean) => {
      /* istanbul ignore else: this should be set by the time we call it */
      if (confirmation) {
        confirmation(ok);
      }
      if (!ok && message?.action === "POP") {
        window.history.forward();
      }
      setIsConfim(false);
    },
    [confirmation, setIsConfim, message],
  );

  return (
    <BrowserRouter
      getUserConfirmation={(payload, callback) => {
        try {
          const incomingMessage = JSON.parse(payload) as ConfirmationMessage;
          if (
            incomingMessage &&
            !matchPath(incomingMessage.pathname, {
              path: incomingMessage.path,
              exact: true,
              strict: true,
            })
          ) {
            setIsConfim(true);
            setConfirmation(() => callback);
            setMessage(incomingMessage);
          }
        } catch (e) {
          setIsConfim(false);
          setMessage(undefined);
          callback(true);
        }
      }}
      {...props}
    >
      <ScrollToTop />
      {children}
      {message && (
        <Dialog
          isOpen={isConfirm}
          title={message.title}
          onDismiss={() => onConfirmation(false)}
        >
          {message?.body && <p>{message.body}</p>}
          <DialogActions>
            <Button onClick={() => onConfirmation(true)}>Yes</Button>
            <Link as="button" onClick={() => onConfirmation(false)}>
              Cancel
            </Link>
          </DialogActions>
        </Dialog>
      )}
    </BrowserRouter>
  );
};
