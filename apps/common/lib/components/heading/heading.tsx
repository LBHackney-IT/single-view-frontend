import React, { forwardRef } from "react";

import cn from "classnames";

import type * as Polymorphic from "@radix-ui/react-polymorphic";

import "./styles.scss";

export interface HeadingProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export type HeadingComponent = Polymorphic.ForwardRefComponent<"h1", HeadingProps>;

export const Heading: HeadingComponent = forwardRef(function Heading(
  { as: HeadingComp, variant = "h1", className, ...props },
  ref,
) {
  const Comp = HeadingComp || variant;
  return (
    <Comp ref={ref} className={cn(`lbh-heading-${variant}`, className)} {...props} />
  );
});
