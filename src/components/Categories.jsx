import React from "react";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { filterList } from "../redux/slices/itemListSlice";

export default function Categories() {
  let dispatch = useDispatch()
  const activeFilter = useSelector((state) => state.list.activeFilter);
  let list = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {list.map((item, index) => {
          return (
            <li
              onClick={() => {
                dispatch(filterList({filter:index}));
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
}
