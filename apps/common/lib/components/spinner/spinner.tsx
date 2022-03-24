import React, { forwardRef } from "react";

import { Icon, IconProps } from "../icon";

interface SpinnerProps extends Omit<IconProps, "viewBox"> {
  label?: string;
}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  { size = "50", label = "Loading...", ...props },
  ref,
) {
  return (
    <Icon ref={ref} viewBox="0 0 42 42" stroke="#00703c" size={size} {...props}>
      <title>{label}</title>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(3 3)" strokeWidth="5">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(112.708 18 18)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </Icon>
  );
});
