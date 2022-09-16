import React from 'react'
import searchImg from "../assets/img/akar-icons-search.svg";
import { useSelector, useDispatch } from 'react-redux';
import { searchList, filterList, setPage } from "../redux/slices/itemListSlice";


export default function Search() {

  let dispatch = useDispatch();
  let searchValue = useSelector((state: {list: any}) => state.list.searchValue);

  const valueRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className="search-input-wrap">
      <img src={searchImg} alt="Pizza logo" />
      <input
        ref={valueRef}
        onInput={() => {
          
          dispatch(searchList({ searchValue: valueRef.current?.value.toUpperCase() }));
          dispatch(filterList({ filter: undefined }));
          dispatch(setPage({ currentPage: 1 }));
        }}
        className="search-input"
        type="text"
        placeholder="Поиск..."
      />
      <button
        onClick={() => {
          if (!valueRef.current) return
          
            valueRef.current.value = "";
            dispatch(searchList({ searchValue: valueRef.current.value.toUpperCase() }));
            dispatch(filterList({ filter: undefined }));
            dispatch(setPage({ currentPage: 1 }));
            valueRef.current.focus()
          
        }}
      >
        {searchValue.length > 0 && ("✖")}
      </button>
    </div>
  );
}
