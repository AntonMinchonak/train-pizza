import React from 'react'
import {Link} from "react-router-dom"
import logoSvg from "../assets/img/pizza-logo.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <Link to="/" className="header__logo">
          <img width="38" src={logoSvg} alt="Pizza logo" />
          {/* <img width="38" src="img/pizza-logo.svg" alt="Pizza logo" /> */}
          <div>
            <h2>Дядя Pizza</h2>
            <p>это не Додо пицца, если шо</p>
          </div>
              </Link>
              <div className="footer-contacts">
                  <div>Антон Минчёнок</div> 
                  <div>+375 29 259 53 07</div> 
            </div>
      </div>
    </div>
  );
}
