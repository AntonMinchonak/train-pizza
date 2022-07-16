import React from 'react'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import {AppContext} from '../App'
import { useSelector } from 'react-redux';


export default function Home() {

  const [page, setPage] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { searchList} = React.useContext(AppContext)
  const listCategory = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];
  const activeFilter = useSelector((state) => state.list.activeFilter);
  const grow = useSelector((state) => state.list.grow);
  const activeSort = useSelector((state) => state.list.activeSort);
  const list = useSelector((state) => state.list.list);
  const filteredList = useSelector((state) => state.list.filteredList);


  const jopa = listCategory[activeFilter] + " питси";


  React.useEffect(() => {
    setCurrentPage(1);
  }, [list, activeFilter, activeSort, grow, searchList]);

  React.useEffect(() => {
    let newPage = [];
    filteredList.forEach((item, index) => {
      if ((index + 1) / 8 <= currentPage && currentPage - 1 <= index / 8) newPage.push(item);
    });
    setPage(newPage);
  }, [currentPage, filteredList]);

  function scrollBack() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  
  let pizzas = page.map((item) => <PizzaBlock key={item.id} info={item} />)
  let skeleton = [...new Array(9)].map((_, i) => <Skeleton key={i} />) 

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeFilter={activeFilter}  />
        <Sort activeSort={activeSort} list={listCategory} grow={grow}  />
      </div>
      <div className="content__title-wrap">
        <h2 className="content__title">{jopa}</h2>
        <Pagination upper currentPage={currentPage} filteredList={filteredList} setCurrentPage={setCurrentPage} scrollBack="" />
      </div>
      <div className="content-items-wrap">
        <div className="content__items">{list.length === 0 ? skeleton : pizzas}</div>
      </div>
      <Pagination currentPage={currentPage} filteredList={filteredList} setCurrentPage={setCurrentPage} scrollBack={scrollBack} />
    </div>
  );
}
