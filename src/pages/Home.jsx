import React from 'react'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';


export default function Home() {

  const listCategory = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];
  const activeFilter = useSelector((state) => state.list.activeFilter);
  const list = useSelector((state) => state.list.list);
  const page = useSelector((state) => state.list.pageList);

  const pageTitle = listCategory[activeFilter] + " питси";

  function scrollBack() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  
  let pizzas = page.map((item) => <PizzaBlock key={item.id} info={item} />)
  let skeleton = [...new Array(8)].map((_, i) => <Skeleton key={i} />) 

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="content__title-wrap">
        <h2 className="content__title">{pageTitle}</h2>
        <Pagination upper scrollBack="" />
      </div>
      <div className="content-items-wrap">
        <div className="content__items">{list.length === 0 ? skeleton : pizzas}</div>
      </div>
      <Pagination scrollBack={scrollBack} />
    </div>
  );
}
