import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import cn from "classnames";

import "./styles.scss";

export interface LinkButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "link" | "danger" | "text-colour" | "muted" | "back-link" | "native";
}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  function LinkButton({ variant = "link", className, children, ...props }, ref) {
    const linkClasses = cn(
      variant !== "native" && {
        "govuk-link lbh-link": variant !== "back-link",
        "govuk-back-link lbh-back-link": variant === "back-link",
        [`lbh-link--${variant}`]: variant !== "link" && variant !== "back-link",
      },
      className,
    );
    return (
      <button ref={ref} className={linkClasses} type="button" {...props}>
        {children}
      </button>
    );
  },
);
