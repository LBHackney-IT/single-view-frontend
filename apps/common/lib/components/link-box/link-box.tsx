import React, { ReactElement, forwardRef } from "react";

import cn from "classnames";

import { widthOverrides } from "../../utils";
import { LinkProps } from "../link";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

export interface LinkOverlayProps {
  children: ReactElement<LinkProps>;
  override?: number;
}

export type LinkOverlayComponent = Polymorphic.ForwardRefComponent<
  "div",
  LinkOverlayProps
>;

export const LinkOverlay: LinkOverlayComponent = forwardRef(function LinkOverlay(
  { as: LinkOverlayComp = "div", className, override, ...props },
  ref,
) {
  return (
    <LinkOverlayComp
      ref={ref}
      className={cn("mtfh-link-overlay", widthOverrides(override), className)}
      {...props}
    />
  );
});

export interface LinkBoxProps {
  override?: number;
}

export type LinkBoxComponent = Polymorphic.ForwardRefComponent<"div", LinkBoxProps>;

export const LinkBox: LinkBoxComponent = forwardRef(function LinkBox(
  { as: LinkBoxComp = "div", className, override, ...props },
  ref,
) {
  return (
    <LinkBoxComp
      ref={ref}
      className={cn("mtfh-link-box", widthOverrides(override), className)}
      {...props}
    />
  );
});
