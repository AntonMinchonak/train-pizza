
import "./scss/app.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import OrderAdress from "./pages/Order/OrderAdress";
// import OrderFinish from "./pages/Order/OrderFinish";
// import NotFound from "./pages/NotFound";
// import OrderPayment from "./pages/Order/OrderPayment"
// import OrderContacts from "./pages/Order/OrderContacts";
// import OrderGoBack from "./pages/Order/OrderGoBack";
// import DetailPage from "./pages/DetailPage";
import { fetchPizzas, sortList, filterList,setPage } from "./redux/slices/itemListSlice";
import { useAppDispatch } from "./redux/slices/itemListSlice";
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))
const OrderAdress = React.lazy(() => import(/* webpackChunkName: "OrderAdress" */ './pages/Order/OrderAdress'))
const OrderPayment = React.lazy(() => import(/* webpackChunkName: "OrderPayment" */ './pages/Order/OrderPayment'))
const OrderContacts = React.lazy(() => import(/* webpackChunkName: "OrderContacts" */ './pages/Order/OrderContacts'))
const OrderGoBack = React.lazy(() => import(/* webpackChunkName: "OrderGoBack" */ './pages/Order/OrderGoBack'))
const OrderFinish = React.lazy(() => import(/* webpackChunkName: "OrderFinish" */ './pages/Order/OrderFinish'))
const DetailPage = React.lazy(() => import(/* webpackChunkName: "DetailPage" */ './pages/DetailPage'))

export type pizzaItemType = {
  image: string;
  title: string;
  sizes: number[];
  types: number[];
  countOffer: number;
  price: number;
  rating: number;
  id: number;
  category: number;
  }

export interface cartItemType extends pizzaItemType  {
  size: number;
  type: number;
}

export type reducerList =  {
        list: never[];
        activeSort: string;
        grow: boolean;
        filteredList: never[];
        activeFilter: number;
        searchValue: string;
        currentPage: number;
        pageList: never[];
        cartList: cartItemType[];
        totalOfferCount: string | number;
        totalOfferPrice: string | number;
    };

function App() {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
   ( async function create() { 
    await dispatch(fetchPizzas());
    await dispatch(sortList({activeSort: "популярности", grow:true}));
    await dispatch(filterList({filter:0}));
    await dispatch(setPage({ currentPage: 1 }));;
   })()
  }, [dispatch]);


  return (
    <div className="wrapper">
      {/* <AppContext.Provider value={{ list, searchList, setSearchList }}> */}
        <Header />
        <div className="content">
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="cart" element={<React.Suspense fallback={<div>Загрузка...</div>}><Cart /></React.Suspense>}></Route>
            <Route path="*" element={<React.Suspense fallback={<div>Загрузка...</div>}><NotFound /></React.Suspense>}></Route>
            <Route path="order-adress" element={<React.Suspense fallback={<div>Загрузка...</div>}><OrderAdress /></React.Suspense>}></Route>
            <Route path="order-payment" element={<React.Suspense fallback={<div>Загрузка...</div>}><OrderPayment /></React.Suspense>}></Route>
            <Route path="order-contacts" element={<React.Suspense fallback={<div>Загрузка...</div>}><OrderContacts /></React.Suspense>}></Route>
            <Route path="order-finish" element={<React.Suspense fallback={<div>Загрузка...</div>}><OrderFinish /></React.Suspense>}></Route>
            <Route path="order-go-back" element={<React.Suspense fallback={<div>Загрузка...</div>}><OrderGoBack /></React.Suspense>}></Route>
            <Route path="detail-page/:id" element={<React.Suspense fallback={<div>Загрузка...</div>}><DetailPage /></React.Suspense>}></Route>
          </Routes>
        </div>
        <Footer />
      {/* </AppContext.Provider> */}
    </div>
  );
}

export default App;