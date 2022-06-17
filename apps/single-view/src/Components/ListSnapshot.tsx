import React, { useEffect, useState } from "react";
import { Link } from "@mfe/common/lib/components";

interface Props {
  list: Array<any>;
  snapshot: number
}

export const ListSnapshot: React.FC<Props> = (props) => {


  const toggleTexts = ["Show more", "Show less"];

  const getThresholdEl = (): HTMLElement | null => {
    if (props.list.length == props.snapshot) return null;
    return document.querySelector("[data-snapshot]") as HTMLElement;
  };

  const [thresholdEl, setThresholdEl] = useState<HTMLElement | null>(
    getThresholdEl
  );
  
  const [height, setHeight] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [toggleText, setToggleText] = useState<string>(toggleTexts[0]);

  const toggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setExpanded(!expanded);
    setToggleText(toggleTexts[+!expanded]);
  };

  useEffect(() => {
    setThresholdEl(getThresholdEl());
  }, [props.list]);

  useEffect(() => {
    let wrapperElRect = document
      .getElementById("snapshotWrapper")
      ?.getBoundingClientRect();

    if (!thresholdEl || !wrapperElRect) {
      setHeight(0);
      return;
    }

    let thresholdElRect = thresholdEl.getBoundingClientRect();
    setHeight(thresholdElRect.y + thresholdElRect.height - wrapperElRect.y);
  }, [thresholdEl]);

  return (
    <>
      <div className="list-snapshot-wrapper">
        <div
          id="snapshotWrapper"
          className="govuk-!-margin-bottom-6"
          style={{
            height: height > 0 && !expanded ? height : "unset",
            overflow: expanded ? "unset" : "hidden",
          }}
        >
          {props.children}
        </div>
        {thresholdEl && (
          <Link href="#" onClick={toggle}>
            {toggleText}
          </Link>
        )}
      </div>
    </>
  );
};
