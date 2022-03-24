import React, {
  Children,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import cn from "classnames";

import { useBreakpoint } from "../../hooks";
import { Accordion, AccordionItem, AccordionItemProps } from "../accordion";
import { Heading } from "../heading";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

export interface SideBarSectionProps extends AccordionItemProps {
  isCollapsed?: boolean;
  heading?: string;
}

export type SideBarSectionComponent = Polymorphic.ForwardRefComponent<
  "div",
  SideBarSectionProps
>;

export const SideBarSection: SideBarSectionComponent = forwardRef(function SideBarSection(
  { children, heading, className, isCollapsed = false, ...props },
  ref,
) {
  if (isCollapsed) {
    return (
      <AccordionItem ref={ref} {...props}>
        {children}
      </AccordionItem>
    );
  }

  return (
    <div ref={ref} className={cn("mtfh-sidebar-section", className)} {...props}>
      {heading ? <Heading as="h2">{heading}</Heading> : undefined}
      {children}
    </div>
  );
});

export interface SideBarProps {
  id: string;
  top?: ReactElement;
  children:
    | ReactElement<SideBarSectionProps>
    | null
    | Array<ReactElement<SideBarSectionProps> | null>;
}

export type SideBarComponent = Polymorphic.ForwardRefComponent<"div", SideBarProps>;

export const SideBar: SideBarComponent = forwardRef(function SideBar(
  { as: SideBarComp = "div", id, top, children, className, ...props },
  ref,
) {
  const isDesktop = useBreakpoint("md");
  const sidebarClasses = cn("mtfh-sidebar", className);

  return (
    <SideBarComp ref={ref} className={sidebarClasses} {...props}>
      {top}
      {!isDesktop ? (
        <Accordion id={id}>
          {Children.map<
            ReactElement<SideBarSectionProps> | undefined,
            ReactElement<SideBarSectionProps> | null
          >(children, (child) =>
            child && isValidElement(child)
              ? cloneElement(child, {
                  isCollapsed: true,
                })
              : undefined,
          )}
        </Accordion>
      ) : (
        <div id={id}>{children}</div>
      )}
    </SideBarComp>
  );
});
