import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./NotFound.module.scss"

export default function NotFound() {
  return (
    <div className="container">
      <h1>Ничего не найдено :(</h1>
      <Link className={"button "+styles["button-back"]} to="/">
        На главную
      </Link>
    </div>
  );
}
