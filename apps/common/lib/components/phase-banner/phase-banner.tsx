import React, { FC, ReactElement } from "react";

import cn from "classnames";
import "./phase-banner.styles.scss";

type TagColorVariants = "grey" | "blue" | "yellow" | "red" | "green";

export interface PhaseBannerProps {
  tag: string;
  children: ReactElement;
  variant?: TagColorVariants | string;
}

export const PhaseBanner: FC<PhaseBannerProps> = ({
  tag,
  children,
  variant = "grey",
}): JSX.Element => {
  const lbhTagColor = `lbh-tag--${variant}`;
  return (
    <div className="container-max-width lbh-phase-banner">
      <p className="govuk-phase-banner__content">
        <strong
          className={cn(
            `${lbhTagColor}`,
            "govuk-phase-banner__content__tag govuk-tag lbh-tag",
          )}
        >
          {tag}
        </strong>
        <span className="govuk-phase-banner__text">{children}</span>
      </p>
    </div>
  );
};
