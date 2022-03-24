import React, { ReactNode } from "react";

import locale from "../../locale";
import { Heading } from "../heading";

export interface StepProps {
  stepIndex?: number;
  children: ReactNode;
}

export const Step = ({ stepIndex, children }: StepProps): JSX.Element => (
  <div className="mtfh-stepper__header">
    <Heading as="h4" variant="h4" className="mtfh-stepper__title">
      <span className="mtfh-stepper__circle mtfh-stepper__circle--number">
        <span className="mtfh-stepper__circle-inner">
          <span className="mtfh-stepper__circle-background">
            <span className="govuk-visually-hidden">
              {locale.components.stepper.step}
            </span>
            {stepIndex}
          </span>
        </span>
      </span>
      <span>
        <button className="mtfh-stepper__button mtfh-stepper__button--title">
          <span>{children}</span>
        </button>
      </span>
    </Heading>
  </div>
);
