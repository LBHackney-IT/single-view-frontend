import React, {
  Children,
  ComponentPropsWithoutRef,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from "react";

import cn from "classnames";

import { widthOverrides } from "../../utils";
import "./styles.scss";

export interface SummaryListItemProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  children?: ReactElement | string | string[] | null;
  actions?: ReactElement | ReactElement[];
  overrides?: number[];
  fallback?: string;
}

export const SummaryListItem = forwardRef<HTMLDivElement, SummaryListItemProps>(
  function SummaryListItem(
    { title, actions, children, className, fallback, overrides = [], ...props },
    ref,
  ) {
    const value = useMemo(
      () => (typeof children === "string" ? children.trim() : children),
      [children],
    );

    return (
      <div ref={ref} className={cn("govuk-summary-list__row", className)} {...props}>
        <dt className={cn("govuk-summary-list__key", widthOverrides(overrides[0]))}>
          {title}
        </dt>
        <dd className={cn("govuk-summary-list__value", widthOverrides(overrides[1]))}>
          {value || fallback || "N/A"}
        </dd>
        {actions && (
          <dd className={cn("govuk-summary-list__actions", widthOverrides(overrides[2]))}>
            <ul className="govuk-summary-list__actions-list">
              {Children.map(actions, (action) => (
                <li key={action.key} className="govuk-summary-list__actions-list-item">
                  {action}
                </li>
              ))}
            </ul>
          </dd>
        )}
      </div>
    );
  },
);

type SummaryListChild =
  | ReactElement<SummaryListItemProps>
  | ReactElement<SummaryListItemProps>[]
  | null;

export interface SummaryListProps extends ComponentPropsWithoutRef<"dl"> {
  variant?: "base" | "border" | "inline";
  overrides?: number[];
  children: SummaryListChild | SummaryListChild[];
}

export const SummaryList = forwardRef<HTMLDListElement, SummaryListProps>(
  function SummaryList(
    { variant = "base", className, overrides, children, ...props },
    ref,
  ) {
    return (
      <dl
        ref={ref}
        className={cn(
          "govuk-summary-list",
          { "govuk-summary-list--no-border": variant !== "border" },
          { "mtfh-summary-list--inline": variant === "inline" },
          "lbh-summary-list",
          className,
        )}
        {...props}
      >
        {Children.map(
          children,
          (child, index) =>
            child &&
            isValidElement<SummaryListItemProps>(child) &&
            cloneElement(child, {
              overrides:
                !child.props.overrides && index === 0 ? overrides : child.props.overrides,
            }),
        )}
      </dl>
    );
  },
);
