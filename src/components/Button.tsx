import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTotalOfferCount, setTotalOfferPrice, setCartList } from "../redux/slices/itemListSlice";
import { pizzaItemType, cartItemType } from "../App";
import { RootState } from "../redux/store";


type buttonProps = {
  info: pizzaItemType;
  cart?: boolean;
  size: number;
  type: number;
  outline?: boolean;
  children?: any
}

function Button(props:buttonProps) {
  const dispatch = useDispatch()
  const totalOfferCount = useSelector((state:RootState) => state.list.totalOfferCount);
  const totalOfferPrice = useSelector((state:RootState) => state.list.totalOfferPrice);
  const cartList = useSelector((state:RootState) => state.list.cartList);
  
  let countInfo = 0

  let inCart = cartList.filter((item:cartItemType) => {
    if (props.info === undefined) return false;
    return item.id === props.info.id;
  });
    
  inCart.forEach((item:cartItemType) => {
    countInfo += item.countOffer;
  })

  let [count, addCount] = React.useState(countInfo);
    
    if (props.cart) {
      return (
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalOfferPrice} ₽</span>
            <div className="button__delimiter"></div>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{totalOfferCount}</span>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={() => {
              dispatch(setCartList({ newItem: props.info, size:props.size, type:props.type }));
              dispatch(setTotalOfferCount());
              dispatch(setTotalOfferPrice());
              addCount(count + 1);
            }}
            className={`button button--add ${props.outline ? "button--outline" : ""} ${props.cart ? "button--cart" : ""}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>

            <span>{props.children || "Добавить"}</span>
            <i>{count}</i>
          </button>
        </div>
      );
    }
}


export default Button

