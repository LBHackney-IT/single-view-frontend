import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import cn from "classnames";

import "./styles.scss";

export type TableProps = ComponentPropsWithoutRef<"table">;
export const Table = forwardRef<HTMLTableElement, TableProps>(function Thead(
  { className, ...props },
  ref,
) {
  return (
    <table ref={ref} className={cn("govuk-table", "lbh-table", className)} {...props} />
  );
});

export type TheadProps = ComponentPropsWithoutRef<"thead">;
export const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(function Thead(
  { className, ...props },
  ref,
) {
  return <thead ref={ref} className={cn("govuk-table__head", className)} {...props} />;
});

export type TbodyProps = ComponentPropsWithoutRef<"tbody">;
export const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(function Tbody(
  { className, ...props },
  ref,
) {
  return <tbody ref={ref} className={cn("govuk-table__body", className)} {...props} />;
});

export type TrProps = ComponentPropsWithoutRef<"tr">;
export const Tr = forwardRef<HTMLTableRowElement, TrProps>(function Tr(
  { className, ...props },
  ref,
) {
  return <tr ref={ref} className={cn("govuk-table__row", className)} {...props} />;
});

export interface ThProps extends ComponentPropsWithoutRef<"th"> {
  isNumeric?: boolean;
}
export const Th = forwardRef<HTMLTableHeaderCellElement, ThProps>(function Th(
  { className, isNumeric, ...props },
  ref,
) {
  const thClasses = cn(
    "govuk-table__cell",
    "govuk-table__header",
    {
      "govuk-table__cell--numeric": isNumeric,
    },
    className,
  );

  return <th ref={ref} className={thClasses} {...props} />;
});

export interface TdProps extends ComponentPropsWithoutRef<"td"> {
  isNumeric?: boolean;
}
export const Td = forwardRef<HTMLTableCellElement, TdProps>(function Td(
  { className, isNumeric, ...props },
  ref,
) {
  const tdClasses = cn(
    "govuk-table__cell",
    {
      "govuk-table__cell--numeric": isNumeric,
    },
    className,
  );

  return <td ref={ref} className={tdClasses} {...props} />;
});

export interface TableCaptionProps extends ComponentPropsWithoutRef<"caption"> {
  variant?: "xlarge" | "large" | "medium" | "small";
}
export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ children, className, variant, ...props }, ref) {
    const captionClasses = cn(
      "govuk-table__caption",
      "lbh-table__caption",
      {
        "govuk-table__caption--s": variant === "small",
        "govuk-table__caption--m": variant === "medium",
        "govuk-table__caption--l": variant === "large",
        "govuk-table__caption--xl": variant === "xlarge",
      },
      className,
    );

    return (
      <caption ref={ref} className={captionClasses} {...props}>
        {children}
      </caption>
    );
  },
);
