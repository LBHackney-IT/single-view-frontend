import React, { useEffect, useState } from "react";

type Props = {
  total: number;
  onPageChange: (page: number) => void;
  pageLimit: number;
};

export const Pagination = (props: Props): JSX.Element => {
  const handleClick = (page: number, e: React.SyntheticEvent): void => {
    e.preventDefault;
    props.onPageChange(page);
  };

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav className="lbh-simple-pagination">
      {currentPage > 1 && (
        <a className="lbh-simple-pagination__link" href="/#">
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
            <path d="M10 1L2 9.5L10 18" stroke-width="2" />
          </svg>
          Previous page
          <span className="lbh-simple-pagination__title">
            {currentPage} of {props.total}
          </span>
        </a>
      )}
      {currentPage != props.total && (
        <a
          className="lbh-simple-pagination__link lbh-simple-pagination__link--next"
          href="/#"
        >
          Next page
          <span className="lbh-simple-pagination__title">
            {currentPage + 1} of {props.total}
          </span>
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
            <path d="M1 18L9 9.5L1 1" stroke-width="2" />
          </svg>
        </a>
      )}
    </nav>
  );
};
