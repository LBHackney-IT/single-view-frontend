import React from "react";
import { JigsawLogin } from "../../Components";
import { locale } from "../../Config/locale";

export const JigsawLoginView = (): JSX.Element => {
  if (window.location.pathname != "/jigsawLogin") {
    window.location.assign("/jigsawLogin");
  }
  document.title = locale.pageTitles.jigsawLogin;
  return (
    <>
      <h1 className="lbh-heading-h1">Login to your Jigsaw account</h1>
      <JigsawLogin />
    </>
  );
};
