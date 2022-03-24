import React, { forwardRef, useEffect, useRef } from "react";
import mergeRefs from "react-merge-refs";

import cn from "classnames";
import { ErrorSummary as ErrorSummaryJs } from "lbh-frontend";

import { widthOverrides } from "../../utils";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

export interface ErrorSummaryProps {
  id: string;
  title: string;
  description?: string;
  reFocus?: number;
  override?: number;
}

export type ErrorSummaryComponent = Polymorphic.ForwardRefComponent<
  "div",
  ErrorSummaryProps
>;

export const ErrorSummary: ErrorSummaryComponent = forwardRef(function ErrorSummary(
  {
    as: ErrorSummaryComp = "div",
    id,
    title,
    description,
    className,
    children,
    reFocus,
    override,
    ...props
  },
  ref,
) {
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /* istanbul ignore else */
    if (localRef.current) {
      // eslint-disable-next-line no-new
      new ErrorSummaryJs(localRef.current);
      localRef.current.scrollIntoView(true);
    }
  }, []);

  useEffect(() => {
    /* istanbul ignore else */
    if (localRef.current) {
      localRef.current.scrollIntoView(true);
    }
  }, [reFocus]);

  return (
    <ErrorSummaryComp
      ref={mergeRefs([localRef, ref])}
      className={cn(
        "govuk-error-summary",
        "lbh-error-summary",
        widthOverrides(override),
        className,
      )}
      aria-labelledby={id}
      role="alert"
      {...props}
    >
      <h2 className="govuk-error-summary__title" id={id}>
        {title}
      </h2>
      {description || children ? (
        <div className="govuk-error-summary__body">
          {description ? <p>{description}</p> : null}
          {children}
        </div>
      ) : null}
    </ErrorSummaryComp>
  );
});
