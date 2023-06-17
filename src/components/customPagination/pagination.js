import React, { useState } from "react";
import styles from "./pagination.module.css";

function Pagination({ currentPage, lastPage, setCurrentPage }) {
  const onPrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const onNext = () => {
    if (currentPage !== lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className={styles.paginationContainer}>
      <div
        aria-hidden="true"
        className={styles.arrow}
        onClick={onPrevious}
        style={{ color: currentPage === 1 ? "#b9b6b6" : "#2e2e2e" }}
      >
        {" "}
        &laquo;
      </div>
      <div className={styles.displayPage}>
        <div>
          {currentPage} of {lastPage}
        </div>
      </div>
      <div
        aria-hidden="true"
        className={styles.arrow}
        onClick={onNext}
        style={{ color: currentPage === lastPage ? "#b9b6b6" : "#2e2e2e" }}
      >
        {" "}
        &raquo;
      </div>
    </div>
  );
}

export default Pagination;
