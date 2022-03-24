import React, { ComponentPropsWithoutRef, forwardRef, useContext } from "react";

import cn from "classnames";

import { PageAnnouncementContext, PageAnnouncementState } from "./context";
import "./styles.scss";

interface PageAnnouncementProps
  extends Partial<PageAnnouncementState>,
    ComponentPropsWithoutRef<"section"> {}

export const PageAnnouncement = forwardRef<HTMLElement, PageAnnouncementProps>(
  function PageAnnouncement({ className, ...props }, ref) {
    const context = useContext(PageAnnouncementContext);

    if (!context?.state?.heading && !props.heading) {
      return null;
    }

    const {
      heading,
      description,
      variant = "success",
      ...rest
    } = {
      ...context?.state,
      ...props,
    };

    return (
      <section
        ref={ref}
        className={cn(
          "lbh-page-announcement",
          {
            [`lbh-page-announcement--${variant}`]: variant && variant !== "success",
          },
          className,
        )}
        {...rest}
        role="alert"
      >
        <h3 className="lbh-page-announcement__title">{heading}</h3>
        {!!description && (
          <div className="lbh-page-announcement__content">{description}</div>
        )}
      </section>
    );
  },
);
