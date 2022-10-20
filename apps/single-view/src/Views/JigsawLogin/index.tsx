import React, { useLayoutEffect } from "react";
import { JigsawLogin } from "../../Components";
import { locale } from "../../Config/locale";

export const JigsawLoginView = (): JSX.Element => {
  useLayoutEffect(() => {
    document.title = locale.pageTitles.jigsawLogin;
  });

  if (window.location.pathname != "/jigsawLogin") {
    window.location.assign("/jigsawLogin");
  }
  return (
    <>
      <h1 className="lbh-heading-h1">Log in to your Jigsaw account</h1>
      <JigsawLogin />
    </>
  );
};
