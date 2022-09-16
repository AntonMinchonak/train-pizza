import React from "react";
import css from "./Order.module.scss"

import { Link } from "react-router-dom";
  
export default function OrderGoBack() {


    return (
      <div className={css.container + " container"}>
        <h2 className={"content__title " + css["content__title"]}>Заказ оформлен</h2>

        <Link className={"button "+css["go-back-btn"]} to="/">На главную</Link>
      </div>
    );
}