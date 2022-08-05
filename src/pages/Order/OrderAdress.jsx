import React from "react";
import css from "./Order.module.scss"
import { useSearchParams } from "react-router-dom";
import ButtonSubmit from "./ButtonSubmit";
import { Link } from "react-router-dom";

export default function OrderAdress() {
  const [searchParams] = useSearchParams()
  let [orderHour, setOrderHour] = React.useState(searchParams.get("orderHour") || new Date().getHours())
  let [orderMinute, setOrderMinute] = React.useState(searchParams.get("orderMinute") || new Date().getMinutes() + 30);
  if (orderMinute > 59) {
    setOrderMinute(+orderMinute-59);
    setOrderHour(+orderHour+1);
  }
  if (orderMinute < 1) {
    setOrderMinute(+orderMinute + 59);
    setOrderHour(+orderHour - 1);
  }

  let [city, setCity] = React.useState(searchParams.get("city") || "");
  let [street, setStreet] = React.useState(searchParams.get("street") || "");
  let [house, setHouse] = React.useState(searchParams.get("house") || "");
  let [room, setRoom] = React.useState(searchParams.get("room") || "");

  const cityRef = React.useRef();
  const streetRef = React.useRef();
  const houseRef = React.useRef();
  const roomRef = React.useRef();
  const hourRef = React.useRef();
  const minuteRef = React.useRef();
  
  searchParams.set("city", city);
  searchParams.set("street", street);
  searchParams.set("house", house);
  searchParams.set("room", room);
  searchParams.set("orderHour", orderHour);
  searchParams.set("orderMinute", orderMinute);
  searchParams.set("paper", searchParams.get("paper"));
  searchParams.set("place", searchParams.get("place"));

  return (
    <div className={css.container + " container"}>
      <Link to={`/cart?${searchParams}`} className={"button " + css["go-back-btn"]}>
        Назад
      </Link>
      <h2 className={"content__title " + css["content__title"]}>Адрес и время заказа</h2>
      <form action="">
        <input ref={cityRef} onChange={() => setCity(cityRef.current.value)} type="text" list="city-list" placeholder="Выберите город" value={city} required />
        <datalist id="city-list">
          <option value="Минск"></option>
          <option value="Брест"></option>
          <option value="Москва"></option>
          <option value="Гномель"></option>
          <option value="Могилёв"></option>
          <option value="Витебск"></option>
          <option value="Гродно"></option>
        </datalist>
        <input onChange={() => setStreet(streetRef.current.value)} ref={streetRef} type="text" placeholder="Улица" value={street} required />
        <div className={css["row-inputs"]}>
          <input onChange={() => setHouse(houseRef.current.value)} ref={houseRef} type="text" placeholder="Дом" value={house} required />
          <input onChange={() => setRoom(roomRef.current.value)} ref={roomRef} type="text" placeholder="Квартира" value={room} required />
        </div>
        <div>
          <input ref={hourRef} onChange={() => setOrderHour(hourRef.current.value)} type="number" min={new Date().getHours()} max="23" name="" id="" value={orderHour} />
          <span> : </span>
          <input
            ref={minuteRef}
            onChange={() => setOrderMinute(minuteRef.current.value)}
            type="number"
            min={orderHour === new Date().getHours() ? new Date().getMinutes() + 30 : "0"}
            max="60"
            name=""
            id=""
            value={orderMinute}
          />
        </div>

        <ButtonSubmit disabled={!(city.length > 2 && street.length > 2 && house.length > 0 && room.length > 0)} to="order-payment" searchParams={searchParams} text="Далее" />
      </form>
    </div>
  );
}