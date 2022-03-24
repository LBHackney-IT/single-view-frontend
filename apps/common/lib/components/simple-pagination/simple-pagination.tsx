import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import cn from "classnames";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

export const SimplePagination = forwardRef<HTMLElement, ComponentPropsWithoutRef<"nav">>(
  function SimplePagination({ className, ...props }, ref) {
    return (
      <nav ref={ref} className={cn("lbh-simple-pagination", className)} {...props} />
    );
  },
);

export interface SimplePaginationButtonProps {
  title?: string;
  variant: "previous" | "next";
}

export type SimplePaginationButtonComponent = Polymorphic.ForwardRefComponent<
  "a",
  SimplePaginationButtonProps
>;

export const SimplePaginationButton: SimplePaginationButtonComponent = forwardRef(
  function SimplePaginationButton(
    { as: SimplePaginationComp = "a", variant, className, title, children, ...props },
    ref,
  ) {
    return (
      <SimplePaginationComp
        ref={ref}
        className={cn(
          "lbh-simple-pagination__link",
          { "lbh-simple-pagination__link--next": variant === "next" },
          className,
        )}
        rel={variant}
        {...props}
      >
        {variant === "previous" ? (
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
            <path d="M10 1L2 9.5L10 18" strokeWidth="2" />
          </svg>
        ) : null}
        {children}
        {title ? <span className="lbh-simple-pagination__title">{title}</span> : null}
        {variant === "next" ? (
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
            <path d="M1 18L9 9.5L1 1" strokeWidth="2" />
          </svg>
        ) : null}
      </SimplePaginationComp>
    );
  },
);
