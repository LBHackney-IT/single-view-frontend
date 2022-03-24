import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  ReactElement,
} from "react";
import mergeRefs from "react-merge-refs";

import cn from "classnames";
import { Details as DetailsJs } from "lbh-frontend";

import "./styles.scss";

export interface DetailsProps extends ComponentPropsWithoutRef<"details"> {
  title: string;
  children: ReactElement;
  className?: string;
}

export const Details = forwardRef<HTMLElement, DetailsProps>(function Details(
  { title, children, className },
  ref,
) {
  const localRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (localRef.current) {
      new DetailsJs(localRef.current).init();
    }
  }, []);

  const classes = {
    "govuk-details lbh-details": true,
  };

  return (
    <details
      id="mtfh-details"
      data-testid="mtfh-details"
      className={cn(classes, className)}
      data-module="govuk-details"
      ref={mergeRefs([localRef, ref])}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{title}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  );
});
