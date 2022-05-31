import React, { useEffect, useState } from "react";

export const Pagination = (): JSX.Element => {
  return (
    <nav className="lbh-simple-pagination">
      <a className="lbh-simple-pagination__link" href="/#">
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
          <path d="M10 1L2 9.5L10 18" stroke-width="2" />
        </svg>
        Previous page
        <span className="lbh-simple-pagination__title"> 1 of 3 </span>
      </a>
      <a
        className="lbh-simple-pagination__link lbh-simple-pagination__link--next"
        href="/#"
      >
        Next page
        <span className="lbh-simple-pagination__title"> 3 of 3 </span>
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
          <path d="M1 18L9 9.5L1 1" stroke-width="2" />
        </svg>
      </a>
    </nav>
  );
};
