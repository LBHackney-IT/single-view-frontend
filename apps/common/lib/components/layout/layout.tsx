import React, { ComponentPropsWithoutRef, ReactElement, forwardRef } from "react";

import cn from "classnames";

import "./styles.scss";

export interface LayoutProps extends ComponentPropsWithoutRef<"div"> {
  top?: ReactElement;
  backLink?: ReactElement;
  side?: ReactElement;
  sidePosition?: "left" | "right";
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { children, top, backLink, side, className, sidePosition = "left", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "mtfh-layout",
        { "mtfh-layout--narrow": !side, "mtfh-layout--right": sidePosition === "right" },
        className,
      )}
      {...props}
    >
      {backLink}
      <div id="content" />
      {top}
      <div className="mtfh-layout__container">
        {side ? <div className="mtfh-layout__aside">{side}</div> : null}
        <div className="mtfh-layout__main">{children}</div>
      </div>
    </div>
  );
});
