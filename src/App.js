// import "./app.css";
import "./scss/app.scss";
import Header from "./components/Header";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { fetchPizzas, sortList, filterList,setPage } from "./redux/slices/itemListSlice";

export const AppContext = React.createContext();

function App() {
  const [searchList, setSearchList] = React.useState([]);

  const list = useSelector(state => state.list.list)
  const dispatch = useDispatch()

  React.useEffect(() => {
   ( async function create() { 
    await dispatch(fetchPizzas());
    await dispatch(sortList({activeSort: "популярности", grow:true}));
    await dispatch(filterList({filter:0}));
    await dispatch(setPage({ currentPage: 1 }));
   })()
  }, [dispatch]);

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ list, searchList, setSearchList }}>
        <Header />
        <div className="content">
          <Routes>
            <Route index element={<Home searchList={searchList} />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;