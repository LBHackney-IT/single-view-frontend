import React, { forwardRef } from "react";

import cn from "classnames";

import type * as Polymorphic from "@radix-ui/react-polymorphic";

import "./styles.scss";

interface BoxProps {
  variant?: "warning" | "success";
}

export type BoxComponent = Polymorphic.ForwardRefComponent<"div", BoxProps>;

export const Box: BoxComponent = forwardRef(function Box(
  { as: BoxComponent = "div", variant = "default", children },
  ref,
) {
  const classes = {
    "mtfh-box": true,
    "mtfh-box--success": variant === "success",
    "mtfh-box--warning": variant === "warning",
  };

  return (
    <BoxComponent ref={ref} className={cn(classes)}>
      {children}
    </BoxComponent>
  );
});
