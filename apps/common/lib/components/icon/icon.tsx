import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import cn from "classnames";

import "./styles.scss";

export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
  viewBox: string;
  size?: string;
  color?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { width, height, color, className, size = "1em", focusable = false, ...props },
  ref,
) {
  const iconClasses = cn("mtfh-icon", className);

  const style: Record<string, string | number> = {};

  if (color && color !== "currentColor") {
    style.color = color;
  }

  return (
    <svg
      ref={ref}
      className={iconClasses}
      width={width || size}
      height={height || size}
      focusable={focusable}
      style={style}
      {...props}
    />
  );
});
