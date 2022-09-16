import React from "react"
import Button from "../Button"
import { Link } from "react-router-dom";
import { pizzaItemType } from "../../App";

export default function PizzaBlock({ info }: { info:pizzaItemType }) {
  const [size, setSize] = React.useState(0)
  const [type, setType] = React.useState(0);


    return (
      <div className="pizza-block">
        <Link to={`detail-page/${info.id}`}>
          <img className="pizza-block__image" src={info.image} alt="Pizza" />
          <h4 className="pizza-block__title">{"Пицца " + info.title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {info.types.map((item, index) => {
              return (
                <li onClick={() => setType(index)} className={type === index ? "active" : ""} key={index}>
                  {item === 0 ? "тонкое" : "традиционное"}
                </li>
              );
            })}
          </ul>
          <ul>
            {info.sizes.map((item, index) => {
              return (
                <li onClick={() => setSize(index)} key={index} className={size === index ? "active" : ""}>
                  {item} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{"от " + info.price + "₽"}</div>
          <Button outline info={info} size={size} type={type}></Button>
        </div>
      </div>
    );  
}