import React from 'react'

export default function Pagination({ currentPage, filteredList, setCurrentPage, scrollBack, upper }) {
  if(!upper) {
    return (
      <div className="pagination">
        <div
          onClick={() => {
            scrollBack();
            return currentPage > 1 ? setCurrentPage(currentPage - 1) : currentPage;
          }}
          className="page-button page-arrow"
        >
          {"←"}
        </div>
        {[...new Array(Math.round(filteredList.length / 8) < 1 ? 1 : Math.round(filteredList.length / 8))].map((_, i) => (
          <div
            onClick={() => {
              setCurrentPage(i + 1);
              scrollBack();
            }}
            className={`page-button ${currentPage === i + 1 ? "page-button--active" : ""}`}
            key={i}
          >
            {i + 1}
          </div>
        ))}
        <div
          onClick={() => {
            scrollBack();
            return currentPage < Math.round(filteredList.length / 8) ? setCurrentPage(currentPage + 1) : currentPage;
          }}
          className="page-button page-arrow"
        >
          {"→"}
        </div>
      </div>
    );
  } else {
    return (
      <div className="pagination">
        <div
          onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : currentPage }
          className="page-button page-arrow"
        >
          {"←"}
        </div>
        <div
          onClick={() => currentPage < Math.round(filteredList.length / 8) ? setCurrentPage(currentPage + 1) : currentPage}
          className="page-button page-arrow"
        >
          {"→"}
        </div>
      </div>
    );
  }
}
