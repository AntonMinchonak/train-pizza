import React from 'react'
import { useSelector, useDispatch } from 'react-redux'; 
import { setPage } from '../redux/slices/itemListSlice';

export default function Pagination({ scrollBack, upper }) {

  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.list.currentPage)
  const filteredList = useSelector((state) => state.list.filteredList);

  if(!upper) {
    return (
      <div className="pagination">
        <div
          onClick={() => {
            scrollBack();
            return currentPage > 1 ?  dispatch(setPage({currentPage:currentPage - 1})) : currentPage;
          }}
          className="page-button page-arrow"
        >
          {"←"}
        </div>
        {[...new Array(Math.round(filteredList.length / 8) < 1 ? 1 : Math.round(filteredList.length / 8))].map((_, i) => (
          <div
            onClick={() => {
             dispatch(setPage({currentPage: i + 1}));
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
            return currentPage < Math.round(filteredList.length / 8) ?  dispatch(setPage({currentPage:currentPage + 1})) : currentPage;
          }}
          className="page-button page-arrow"
        >
          {"→"}
        </div>
      </div>
    );
  } else {
    // return (
    //   <div className="pagination">
    //     <div
    //       onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : currentPage }
    //       className="page-button page-arrow"
    //     >
    //       {"←"}
    //     </div>
    //     <div
    //       onClick={() => currentPage < Math.round(filteredList.length / 8) ? setCurrentPage(currentPage + 1) : currentPage}
    //       className="page-button page-arrow"
    //     >
    //       {"→"}
    //     </div>
    //   </div>
    // );
  }
}
