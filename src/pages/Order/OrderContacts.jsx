import React from "react";
import css from "./Order.module.scss"
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ButtonSubmit from "./ButtonSubmit";
  
export default function OrderContacts() {
    let [searchParams] = useSearchParams();
    let [tel, setTel] = React.useState(searchParams.get("tel") || "");
    let [mail, setMail] = React.useState(searchParams.get("mail") || "");
    
    const telRef = React.useRef();
    const mailRef = React.useRef();

    searchParams.set("tel", tel);
    searchParams.set("mail", mail);
  
    return (
      <div className={css.container + " container"}>
        <Link to={`/order-payment?${searchParams}`} className={"button " + css["go-back-btn"]}>
          Назад
        </Link>
        <h2 className={"content__title " + css["content__title"]}>Способ связи</h2>

        <form action="">
          <input ref={telRef} onChange={() => setTel(telRef.current.value)} type="tel" placeholder="Телефон" value={tel} />
          <input ref={mailRef} onChange={() => setMail(mailRef.current.value)} type="email" placeholder="E-mail" value={mail} />
          <ButtonSubmit to="order-finish" searchParams={searchParams} text="Заказать" />
        </form>
      </div>
    );
}