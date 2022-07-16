import React from 'react'
import searchImg from "../assets/img/akar-icons-search.svg";
import { useSelector, useDispatch } from 'react-redux';
import { searchList, filterList } from '../redux/slices/itemListSlice';


export default function Search() {

  let dispatch = useDispatch();
  let searchValue = useSelector((state) => state.list.searchValue);
  console.log(searchValue);
  const valueRef = React.useRef()

  return (
    <div className="search-input-wrap">
      <img src={searchImg} alt="Pizza logo" />
      <input
        ref={valueRef}
        onInput={() => {
          dispatch(searchList({ searchValue: valueRef.current.value.toUpperCase() }));
          dispatch(filterList({ filter: undefined }));

        }}
        className="search-input"
        type="text"
        placeholder="Поиск..."
      />
      <button
        onClick={() => {
          valueRef.current.value = "";
          dispatch(searchList({ searchValue: valueRef.current.value.toUpperCase() }));
          dispatch(filterList({ filter: undefined }));
        }}
      >
        {searchValue.length > 0 && ("✖")}
      </button>
    </div>
  );
}
