import React, { useEffect, useState } from "react";

type Props = {
  total: number;
  onPageChange: (currentPage: number, isNext: boolean) => void;
  pageSize: number;
};

export const Pagination = (props: Props): JSX.Element => {
  const previousPage = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
    props.onPageChange(currentPage, false);
  };

  const nextPage = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    props.onPageChange(currentPage, true);
  };

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav className="lbh-simple-pagination">
      {currentPage > 1 && (
        <a
          className="lbh-simple-pagination__link"
          href="/#"
          onClick={(e) => previousPage(e)}
        >
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
            <path d="M10 1L2 9.5L10 18" stroke-width="2" />
          </svg>
          Previous page
          <span className="lbh-simple-pagination__title">
            {currentPage - 1} of {props.total / props.pageSize}
          </span>
        </a>
      )}
      {currentPage != props.total / props.pageSize && (
        <a
          className="lbh-simple-pagination__link lbh-simple-pagination__link--next"
          href="/#"
          onClick={(e) => nextPage(e)}
        >
          Next page
          <span className="lbh-simple-pagination__title">
            {currentPage + 1} of {props.total / props.pageSize}
          </span>
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
            <path d="M1 18L9 9.5L1 1" stroke-width="2" />
          </svg>
        </a>
      )}
    </nav>
  );
};
