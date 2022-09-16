import React from "react";
import css from "./Order.module.scss"
import { useSearchParams } from "react-router-dom";
import ButtonSubmit from "./ButtonSubmit";
import { Link } from "react-router-dom";

export default function OrderAdress() {
  const [searchParams] = useSearchParams()
  let [orderHour, setOrderHour] = React.useState(searchParams.get("orderHour") || new Date().getHours())
  let [orderMinute, setOrderMinute] = React.useState(searchParams.get("orderMinute") || new Date().getMinutes() + 30);
  let [wrongForm, setWrongForm] = React.useState(false);

  let dateNow = new Date();
  let [time, setTime] = React.useState(searchParams.get("time") || dateNow.toISOString().slice(0, 10));
  let dateMax: (string|number)[] | string = dateNow.toISOString().slice(0, 10).split("-");
  dateMax[2] = +dateMax[2] + 4;
  dateMax = dateMax.join("-");

  let timeParse = time.split('-')
  let dateOrder = new Date(+timeParse[0], +timeParse[1]-1, +timeParse[2], +orderHour, +orderMinute).getTime()

  if (orderMinute > 59) {
    setOrderMinute(+orderMinute -59);
    setOrderHour(+orderHour+1);
  }
  if (orderMinute < 0) {
    setOrderMinute(+orderMinute + 60);
    setOrderHour(+orderHour - 1);
  }

  if (orderHour < 0) {
    setOrderHour(+orderHour +24);
  }

  if (orderHour > 23) {
    setOrderHour(+orderHour - 24);
  }

  if (dateOrder - dateNow.getTime() < 1800000) {
    const timeOrder = +orderHour * 60 + ~~orderMinute;
    const minutes = timeOrder % 60;
    const hours = Math.trunc(timeOrder / 60);
    if (dateOrder - dateNow.getTime() < 180000) setOrderHour(hours + 1);
    else setOrderMinute(minutes + 1);
  }

  let [city, setCity] = React.useState(searchParams.get("city") || "");
  let [street, setStreet] = React.useState(searchParams.get("street") || "");
  let [house, setHouse] = React.useState(searchParams.get("house") || "");
  let [room, setRoom] = React.useState(searchParams.get("room") || "");

  let cityValidate = city.length < 3;
  let streetValidate = street.length < 3;
  let houseValidate = house.length < 1;
  let roomValidate = room.length < 1;

  const cityRef = React.useRef<HTMLInputElement>(null);
  const streetRef = React.useRef<HTMLInputElement>(null);
  const houseRef = React.useRef<HTMLInputElement>(null);
  const roomRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const timeRef = React.useRef<HTMLInputElement>(null);
  
  searchParams.set("city", city);
  searchParams.set("street", street);
  searchParams.set("house", house);
  searchParams.set("room", room);
  searchParams.set("orderHour", String(orderHour));
  searchParams.set("orderMinute", String(orderMinute));
  searchParams.set("time", time);
  searchParams.set("paper", searchParams.get("paper") || "");
  searchParams.set("place", searchParams.get("place") || "");

  return (
    <div className={css.container + " container"}>
      <Link to={`/cart?${searchParams}`} className={"button " + css["go-back-btn"]}>
        Назад
      </Link>
      <h2 className={"content__title " + css["content__title"]}>Адрес и время заказа</h2>
      <form action="">
        <div className={css["input-block"]}>
          <input
            className={wrongForm && cityValidate ? css.warning : ""}
            ref={cityRef}
            onChange={() => setCity(String(cityRef.current?.value))}
            type="text"
            list="city-list"
            placeholder="Выберите город"
            value={city}
            required
          />
          {cityValidate && wrongForm && <label className={css.warning}>Название города должно содержать не менее трёх символов</label>}
          <datalist id="city-list">
            <option value="Минск"></option>
            <option value="Брест"></option>
            <option value="Москва"></option>
            <option value="Гномель"></option>
            <option value="Могилёв"></option>
            <option value="Витебск"></option>
            <option value="Гродно"></option>
          </datalist>
        </div>

        <div className={css["input-block"]}>
          <input
            className={wrongForm && streetValidate ? css.warning : ""}
            onChange={() => setStreet(String(streetRef.current?.value))}
            ref={streetRef}
            type="text"
            placeholder="Улица"
            value={street}
            required
          />
          {streetValidate && wrongForm && <label className={css.warning}>Название улицы должно содержать не менее трёх символов</label>}
        </div>

        <div className={css["row-inputs"]}>
          <div className={css["input-block"]}>
            <input className={wrongForm && houseValidate ? css.warning : ""} onChange={() => setHouse(String(houseRef.current?.value))} ref={houseRef} type="text" placeholder="Дом" value={house} required />
            {houseValidate && wrongForm && <label className={css.warning}>Номер дома должен содержать не менее одного символа</label>}
          </div>
          <div className={css["input-block"]}>
            <input className={wrongForm && roomValidate ? css.warning : ""} onChange={() => setRoom(String(roomRef.current?.value))} ref={roomRef} type="text" placeholder="Квартира" value={room} required />
            {roomValidate && wrongForm && <label className={css.warning}>Номер дома должен содержать не менее одного символа</label>}
          </div>
        </div>

        <div className={css["row-inputs--date"]}>
          <input ref={timeRef} onChange={() => setTime(String(timeRef.current?.value))} type="date" name="" id="" value={time} min={dateNow.toISOString().slice(0, 10)} max={dateMax} />
          <div>
            <input ref={hourRef} onChange={() => setOrderHour(Number(hourRef.current?.value))} type="number" min={-1} max="24" name="" id="" value={orderHour} />
            <span> : </span>
            <input ref={minuteRef} onChange={() => setOrderMinute(Number(minuteRef.current?.value))} type="number" min={"-1"} max="60" name="" id="" value={orderMinute} />
          </div>
        </div>

        <ButtonSubmit setWrongForm={setWrongForm} disabled={cityValidate || streetValidate || houseValidate || roomValidate} to="order-payment" searchParams={searchParams} text="Далее" />
      </form>
    </div>
  );
}