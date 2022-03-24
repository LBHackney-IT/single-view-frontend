import React, {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import mergeRefs from "react-merge-refs";

import cn from "classnames";
import { Checkboxes } from "lbh-frontend";

import "./styles.scss";

export interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  hint?: string;
  children: ReactNode;
  conditionalId?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, className, type = "checkbox", hint, children, conditionalId, error, ...props },
  ref,
) {
  return (
    <div className={cn("govuk-checkboxes__item", className)}>
      <input
        ref={ref}
        id={id}
        className="govuk-checkboxes__input"
        type={type}
        aria-describedby={hint ? `${id}-hint` : undefined}
        data-aria-controls={conditionalId}
        {...props}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
        {children}
      </label>
      {hint ? (
        <span id={`${id}-hint`} className="govuk-hint govuk-checkboxes__hint lbh-hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
});

export const CheckboxConditional = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function CheckboxConditional(props, ref) {
  return (
    <div
      ref={ref}
      className="govuk-checkboxes__conditional govuk-checkboxes__conditional--hidden"
      {...props}
    />
  );
});

export interface CheckboxGroupProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "base" | "small";
  error?: string;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup({ variant = "base", children, error, ...props }, ref) {
    const localRef = useRef<HTMLDivElement>();

    useEffect(() => {
      /* istanbul ignore else */
      if (localRef.current) {
        new Checkboxes(localRef.current).init();
      }
    }, []);

    const hasConditionals = useMemo(
      () =>
        Children.toArray(children).some(
          (child) => isValidElement(child) && child.type === CheckboxConditional,
        ),
      [children],
    );

    return (
      <div
        ref={mergeRefs([localRef, ref])}
        className={cn(
          "govuk-checkboxes",
          {
            "govuk-checkboxes--small": variant === "small",
            "govuk-checkboxes--conditionals": hasConditionals,
          },
          "lbh-checkboxes",
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
