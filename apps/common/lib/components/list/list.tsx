import React, { forwardRef, isValidElement } from "react";

import cn from "classnames";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

export interface ListProps {
  variant?: "base" | "bullets" | "numbers";
}

export type ListComponent = Polymorphic.ForwardRefComponent<"ul", ListProps>;

export const List: ListComponent = forwardRef(function List(
  { as: ListComp = "ul", variant = "base", className, children, ...props },
  ref,
) {
  return (
    <ListComp
      ref={ref}
      className={cn(
        "lbh-list",
        {
          "lbh-list--bullet": variant === "bullets",
          "lbh-list--number": variant === "numbers",
        },
        className,
      )}
      {...props}
    >
      {React.Children.map(
        children,
        (child, index) => child && isValidElement(child) && <li key={index}>{child}</li>,
      )}
    </ListComp>
  );
});
