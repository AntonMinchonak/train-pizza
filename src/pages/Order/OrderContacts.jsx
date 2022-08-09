import React from "react";
import css from "./Order.module.scss"
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import ButtonSubmit from "./ButtonSubmit";
  
export default function OrderContacts() {
  let [searchParams] = useSearchParams();
  let [tel, setTel] = React.useState(searchParams.get("tel") || "");
  let [mail, setMail] = React.useState(searchParams.get("mail") || "");
  let [wrongForm, setWrongForm] = React.useState(false);

  const telRef = React.useRef();
  const mailRef = React.useRef();
  searchParams.set("tel", tel);
  searchParams.set("mail", mail);
  
  let isTelIncludes=false;
  const telRestrict = ',.-<>/`"*[]{}&^%$#@!:;_\\/'
  for (let i = 0; i < tel.length; i++) {
    if (tel[i] >= 'a') isTelIncludes = true;
    if (telRestrict.includes(tel[i])) isTelIncludes = true;
  }

  let isMailIncludes = false;
  const mailRestrict = ',-<>/`"*[]{}&^%$#!:;\\/';
  for (let i = 0; i < mail.length; i++) {
    if (mail[i] >= "А") isMailIncludes = true;
    if (mailRestrict.includes(mail[i])) isMailIncludes = true;
  }

  const telValidation = !tel.includes("+") || tel.length < 13 || tel.length > 21 || isTelIncludes; 
  const mailValidation = !mail.includes(".") || !mail.includes("@") || mail.length < 13 || isMailIncludes; 
  return (

    <div className={css.container + " container"}>

      <Link to={`/order-payment?${searchParams}`} className={"button " + css["go-back-btn"]}>
        Назад
      </Link>

      <h2 className={"content__title " + css["content__title"]}>Способ связи</h2>
     
      <form action="">

        <div className={css["input-block"]}>
          <input ref={telRef} className={telValidation && wrongForm ? css.warning : ""} onChange={() => setTel(telRef.current.value)} type="tel" placeholder="Телефон" value={tel} />
          {telValidation && wrongForm && <label className={css.warning}>Телефон должен содержать знак "+", быть нужной длины и не иметь запрещённых символов</label>}
        </div>

        <div className={css["input-block"]}>
          <input ref={mailRef} className={mailValidation && wrongForm ? css.warning : ""} onChange={() => setMail(mailRef.current.value)} type="email" placeholder="E-mail" value={mail} />
          {mailValidation && wrongForm && <label className={css.warning}>e-mail должен содержать знак "@", точку, быть нужной длины и не иметь запрещённых символов</label>}
        </div>
        
        <ButtonSubmit setWrongForm={setWrongForm} disabled={telValidation || mailValidation} to="order-finish" searchParams={searchParams} text="Заказать" />
      
      </form>

    </div>
  );
}