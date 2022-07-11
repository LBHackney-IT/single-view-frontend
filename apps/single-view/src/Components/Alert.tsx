import React from "react";

interface Props {
    index: number;
    title: string;
    message?: string;
    messages?: string[];
}

export const Alert: React.FC<Props> = (props) => {
    
    return(
        <div 
            key={props.index}
            className="govuk-error-summary"
            aria-labelledby="error-summary-title"
            role="alert"
            data-module="govuk-error-summary"
        >
            <h2
                className="govuk-error-summary__title"
                id="error-summary-title"
                data-testid="cautionaryAlert-alertCode"
            >
                {props.title}
            </h2>
            
            <div
                className="govuk-error-summary__body govuk-error-colour"
                data-testid="cautionaryAlert-alertMessage"
            >
                {props.message 
                    ? <p>{props.message}</p> 
                    : props.messages?.map((message, index) => {
                        return(
                            <p key={index}>{message}</p>
                        )})    
                }
            </div>
            
        </div>
    )
}