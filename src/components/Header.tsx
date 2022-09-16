import React from "react";
import logoSvg from "../assets/img/pizza-logo.svg";
import Button from "./Button";
import { Link } from "react-router-dom";
import Search from "./Search";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img width="38" src={logoSvg} alt="Pizza logo" />
          {/* <img width="38" src="img/pizza-logo.svg" alt="Pizza logo" /> */}
          <div>
            <h1>Дядя Pizza</h1>
            <p>это не Додо пицца, если шо</p>
          </div>
        </Link>
        <Search />

        <Button info={{image: 'string',
  title: "string",
  sizes: [],
  types: [],
  countOffer: 0,
  price: 0,
  rating: 0,
  id: 0,
  category: 0}} cart type={0} size={0} />
      </div>
    </div>
  );
}
export default Header;
