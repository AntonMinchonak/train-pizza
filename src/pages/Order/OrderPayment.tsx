import React from "react";
import css from "./Order.module.scss"
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ButtonSubmit from "./ButtonSubmit";

export default function OrderPayment() {

  let [searchParams] = useSearchParams();

  let oldParams= [true, true];
  let oldPaper = searchParams.get("paper")
  let oldPlace = searchParams.get("place")
  if (oldPaper && oldPlace) {
    oldParams = [!!JSON.parse(oldPaper), !!JSON.parse(oldPlace)];
  }
  let [paper, setPaper] = React.useState(oldParams[0]);
  let [place, setPlace] = React.useState(oldParams[1]);

  let [numCard, setNumCard] = React.useState('')
  let [cvv, setCvv] = React.useState("");
  let [nameCard, setNameCard] = React.useState("");
  let [expire, setExpire] = React.useState("");

  const paperRef = React.useRef<HTMLInputElement>(null)
  const cardRef = React.useRef<HTMLInputElement>(null)
  const placeRef = React.useRef<HTMLInputElement>(null)
  const onlineRef = React.useRef<HTMLInputElement>(null)

  const numCardRef = React.useRef<HTMLInputElement>(null);
  const cvvRef = React.useRef<HTMLInputElement>(null);
  const nameCardRef = React.useRef<HTMLInputElement>(null);
  const expireRef = React.useRef<HTMLInputElement>(null);

  searchParams.set("paper", String(paper));
  searchParams.set("place", String(place));


  return (
    <div className={css.container + " container"}>
      <Link to={`/order-adress?${searchParams}`} className={"button " + css["go-back-btn"]}>
        Назад
      </Link>
      <h2 className={"content__title " + css["content__title"]}>Способ оплаты</h2>
      <form action="">
        <div className={css.checkboxes}>
          <input
            id="paperRef"
            ref={paperRef}
            name="pay-type"
            onChange={() => {
              setPaper(true);
              setPlace(true);
            }}
            type="radio"
            checked={paper}
          />
          <label htmlFor="paperRef">Наличные</label>
          <input id="cardRef" ref={cardRef} name="pay-type" onChange={() => setPaper(false)} type="radio" checked={!paper} />
          <label htmlFor="cardRef">Карта</label>
        </div>
        {!paper && (
          <div className={css.checkboxes}>
            <input id="placeRef" ref={placeRef} onChange={() => setPlace(true)} type="radio" name="card-type" checked={place} />
            <label htmlFor="placeRef">При получении</label>
            <input id="onlineRef" ref={onlineRef} onChange={() => setPlace(false)} type="radio" name="card-type" checked={!place} />
            <label htmlFor="onlineRef">Онлайн</label>
          </div>
        )}
        {!place && !paper && (
          <div className={css.bank}>
            <input ref={numCardRef} onChange={() => setNumCard(String(numCardRef.current?.value))} type="text" placeholder="Номер карты" />
            <input ref={expireRef} onChange={() => setExpire(String(expireRef.current?.value))} type="text" placeholder="Срок действия карты" />
            <input ref={cvvRef} onChange={() => setCvv(String(cvvRef.current?.value))} type="text" placeholder="CVV-код" />
            <input ref={nameCardRef} onChange={() => setNameCard(String(nameCardRef.current?.value))} type="text" placeholder="Имя владельца" />
          </div>
        )}
        <ButtonSubmit
          disabled={(!paper && !place &&numCardRef.current === undefined) || (!place && !paper && numCard.length < 16 && expire.length < 5 && cvv.length < 3 && nameCard.length < 6)}
          to="order-contacts"
          searchParams={searchParams}
          text="Далее"
        />
      </form>
    </div>
  );
}