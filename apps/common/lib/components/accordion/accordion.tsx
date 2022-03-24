import React, { ReactElement, forwardRef, useEffect, useRef } from "react";
import mergeRefs from "react-merge-refs";

import cn from "classnames";
import { Accordion as AccordionJs } from "lbh-frontend";

import { widthOverrides } from "../../utils";
import { Heading } from "../heading";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

export interface AccordionItemProps {
  id: string;
  title: string;
}

export type AccordionItemComponent = Polymorphic.ForwardRefComponent<
  "div",
  AccordionItemProps
>;

export const AccordionItem: AccordionItemComponent = forwardRef(function AccordionItem(
  { as: AccordionItemComp = "div", children, className, id, title },
  ref,
) {
  return (
    <AccordionItemComp ref={ref} className={cn("govuk-accordion__section", className)}>
      <div className="govuk-accordion__section-header">
        <Heading as="h3" variant="h5" className="govuk-accordion__section-heading">
          <span
            className="govuk-accordion__section-button"
            id={`accordion-heading-${id}`}
          >
            {title}
          </span>
        </Heading>
      </div>
      <div
        id={`accordion-content-${id}`}
        className="govuk-accordion__section-content"
        aria-labelledby={`accordion-heading-${id}`}
      >
        {children}
      </div>
    </AccordionItemComp>
  );
});

type AccordionChild =
  | ReactElement<AccordionItemProps>
  | ReactElement<AccordionItemProps>[]
  | null;

export interface AccordionProps {
  id: string;
  children: AccordionChild | AccordionChild[];
  defaultIndex?: number;
  visuallyHideControls?: boolean;
  override?: number;
}

export type AccordionComponent = Polymorphic.ForwardRefComponent<"div", AccordionProps>;

export const Accordion: AccordionComponent = forwardRef(function Accordion(
  {
    as: AccordionComp = "div",
    className,
    defaultIndex,
    override,
    visuallyHideControls = false,
    ...props
  },
  ref,
) {
  const localRef = useRef<HTMLElement>(null);
  const defaultIndexRef = useRef<number | undefined>(defaultIndex);

  useEffect(() => {
    /* istanbul ignore else */
    if (localRef.current) {
      const acc = new AccordionJs(localRef.current);
      acc.init();
      /* istanbul ignore else */
      if (defaultIndexRef.current !== undefined) {
        const section = acc.$sections.item(defaultIndexRef.current);
        /* istanbul ignore else */
        if (section) {
          const button = section.querySelector<HTMLButtonElement>(
            `.${acc.sectionButtonClass}`,
          );
          /* istanbul ignore else */
          if (button) {
            const contentId = button.getAttribute("aria-controls");
            /* istanbul ignore else */
            if (contentId && !window.sessionStorage.getItem(contentId)) {
              acc.setExpanded(true, acc.$sections.item(defaultIndexRef.current));
            }
          }
        }
      }
    }
  }, []);

  return (
    <AccordionComp
      className={cn(
        "govuk-accordion",
        "lbh-accordion",
        { "lbh-accordion--hide-controls": visuallyHideControls },
        widthOverrides(override),
        className,
      )}
      data-attribute="value"
      ref={mergeRefs([localRef, ref])}
      {...props}
    />
  );
});
