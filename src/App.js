// import "./app.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrderAdress from "./pages/Order/OrderAdress";
import OrderFinish from "./pages/Order/OrderFinish";
import NotFound from "./pages/NotFound";
import OrderPayment from "./pages/Order/OrderPayment"
import OrderContacts from "./pages/Order/OrderContacts";
import OrderGoBack from "./pages/Order/OrderGoBack";
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
            <Route path="order-adress" element={<OrderAdress />}></Route>
            <Route path="order-payment" element={<OrderPayment />}></Route>
            <Route path="order-contacts" element={<OrderContacts />}></Route>
            <Route path="order-finish" element={<OrderFinish />}></Route>
            <Route path="order-go-back" element={<OrderGoBack />}></Route>
          </Routes>
        </div>
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;