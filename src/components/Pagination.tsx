import React from 'react'
import { useSelector, useDispatch } from 'react-redux'; 
import { setPage } from '../redux/slices/itemListSlice';
import { RootState } from '../redux/store';

type PaginationProps = { scrollBack: ()=>void; upper?: Boolean; }

export default function Pagination({ scrollBack, upper }:PaginationProps) {

  const dispatch = useDispatch()
  const currentPage = useSelector((state: RootState) => state.list.currentPage)
  const filteredList = useSelector((state: RootState) => state.list.filteredList);

    return (
      <div className="pagination">
        <div
          onClick={() => {
            if(upper===undefined) scrollBack();
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
            style={upper ? {display:"none"} : {}}
          >
            {i + 1}
          </div>
        ))}

        <div
          onClick={() => {
            if (upper === undefined) scrollBack();
            return currentPage < Math.round(filteredList.length / 8) ?  dispatch(setPage({currentPage:currentPage + 1})) : currentPage;
          }}
          className="page-button page-arrow"
        >
          {"→"}
        </div>
      </div>
    );
 
}
