import React from 'react'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { pizzaItemType } from '../App';
import { RootState } from '../redux/store';

export default function Home() {

  const listCategory = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];
  const activeFilter = useSelector((state:RootState) => state.list.activeFilter);
  const page = useSelector((state:RootState) => state.list.pageList);

  const pageTitle = listCategory[activeFilter] + " питси";

  function scrollBack() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  
  let pizzas = page.map((item:pizzaItemType) => <PizzaBlock key={item.id} info={item} />)
  let skeleton = [...new Array(8)].map((_, i) => <Skeleton key={i} />) 

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="content__title-wrap">
        <h2 className="content__title">{pageTitle}</h2>
        <Pagination upper scrollBack={scrollBack} />
      </div>
      <div className="content-items-wrap">
        <div className="content__items">{page.length === 0 ? skeleton : pizzas}</div>
      </div>
      <Pagination scrollBack={scrollBack} />
    </div>
  );
}
