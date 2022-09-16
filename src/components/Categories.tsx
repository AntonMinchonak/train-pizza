import React from "react";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { filterList, setPage } from "../redux/slices/itemListSlice";
import { RootState } from "../redux/store";


 const Categories = React.memo(function Categories(): JSX.Element {
  let dispatch = useDispatch()
  const activeFilter = useSelector((state:RootState) => state.list.activeFilter);
  let list = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {list.map((item, index) => {
          return (
            <li
              onClick={() => {
                dispatch(filterList({ filter: index }));
                dispatch(setPage({ currentPage: 1 }));
              }}
              key={index}
              className={activeFilter === index ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
})
export default Categories