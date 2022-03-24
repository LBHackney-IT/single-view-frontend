import React, { forwardRef } from "react";

import cn from "classnames";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

export interface TextProps {
  variant?: "base" | "regular" | "bold";
  size?: "base" | "xs" | "sm" | "md" | "lg";
}

export type TextComponent = Polymorphic.ForwardRefComponent<"p", TextProps>;

export const Text: TextComponent = forwardRef(function Text(
  { as: TextComp = "p", variant = "base", size = "md", className, ...props },
  ref,
) {
  return (
    <TextComp
      ref={ref}
      className={cn(
        {
          "lbh-body-xs": size === "xs",
          "lbh-body-s": size === "sm",
          "lbh-body-m": size === "md",
          "lbh-body-l": size === "lg",
          "lbh-!-font-weight-regular": variant === "regular",
          "lbh-!-font-weight-bold": variant === "bold",
        },
        className,
      )}
      {...props}
    />
  );
});
