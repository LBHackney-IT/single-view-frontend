import React, { useState } from "react";
import { JigsawLogin } from "../../Components";

export const JigsawLoginView = (): JSX.Element => {
  return (
    <>
      <h1 className="lbh-heading-h1">Login to your Jigsaw account</h1>
      <JigsawLogin />
    </>
  );
};
