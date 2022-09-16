import React from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { sortList, filterList, setPage } from "../redux/slices/itemListSlice";
import { RootState } from '../redux/store';

const Sort =  React.memo(function Sort() {
  const dispatch = useDispatch()

  const list:("популярности"| "цене"| "алфавиту")[] = ["популярности", "цене", "алфавиту"];
  const activeSort = useSelector((state: RootState) => state.list.activeSort);
  const grow = useSelector((state: RootState) => state.list.grow);
  const [showPopup, changeVisibility] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null)
  const popupBtnRef = React.useRef<HTMLSpanElement>(null);


  document.body.onclick = (evt: MouseEvent) => {
    const _evt = evt as MouseEvent & {path: Node[];}
    if (popupRef.current && popupBtnRef.current && !_evt.path.includes(popupRef.current) && !_evt.path.includes(popupBtnRef.current)) {
      changeVisibility(false);
    }
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <button
          onClick={() => {
            dispatch(sortList({ activeSort: activeSort, grow: !grow }));
            dispatch(filterList({ filter: undefined }));
            dispatch(setPage({ currentPage: 1 }));
          }}
          style={grow ? {} : { transform: "rotate(180deg)" }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </button>
        <b>Сортировка по:</b>
        <span ref={popupBtnRef} onClick={() => changeVisibility(!showPopup)}>
          {activeSort}
        </span>
      </div>
      <div ref={popupRef} className="sort__popup" style={showPopup ? {} : { display: "none" }}>
        <ul>
          {list.map((item, index) => {
            return (
              <li
                onClick={() => {
                  dispatch(sortList({ activeSort: item, grow: grow }));
                  dispatch(filterList({ filter: undefined }));
                  dispatch(setPage({ currentPage: 1 }));
                  changeVisibility(!showPopup);
                }}
                key={index}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
})

export default Sort 