import React from "react";
import css from "./Order.module.scss"
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ButtonSubmit from "./ButtonSubmit";
import CartBlock from "../../components/CartBlock";
import { useSelector } from "react-redux/es/exports";
  
export default function OrderFinish() {
  let [searchParams] = useSearchParams();
  let totalOfferPrice = useSelector(state => state.list.totalOfferPrice);

  let orderInfo = []
  for (let entry of searchParams.entries()) {
      orderInfo.push(entry)
  }
    
  let cartList =JSON.parse(sessionStorage.getItem("cartList"));

    return (
      <div className={css.container + " container"}>
        <Link to={`/order-contacts?${searchParams}`} className={"button " + css["go-back-btn"]}>
          Назад
        </Link>
        <h2 className={"content__title " + css["content__title"]}>Подтверждение заказа</h2>
        <div className={css["cart-list"]}>
          {cartList.map((item, i) => (
            <CartBlock key={i} info={item} order />
          ))}
        </div>
        <form className={css["text-fields"]} action="">
          <div className={css["text-field"]}>
            <span>Адрес:</span> г.{searchParams.get("city")}, ул.{searchParams.get("street")}, д.{searchParams.get("house")}, кв.{searchParams.get("room")}
          </div>
          <div className={css["text-field"]}>
            <span>Время доставки:</span> {searchParams.get("orderHour")} : {searchParams.get("orderMinute")} ({searchParams.get("time")})
          </div>
          <div className={css["text-field"]}>
            <span>Способ оплаты:</span> {searchParams.get("paper") ? "Наличными" : "По карте"} {searchParams.get("place") ? "при получении" : "онлайн"}
          </div>
          <div className={css["text-field"]}>
            <span>Ваши контакты:</span> телефон {searchParams.get("tel")}, e-mail {searchParams.get("mail")}
          </div>
          <div className={css["text-field"]}>
            <span>Общая стоимость:</span> {totalOfferPrice} рублей
          </div>
          <ButtonSubmit finish to="order-go-back" searchParams="" text="Заказать" />
        </form>
      </div>
    );
}