import React from "react"
import Button from "../Button"

export default function PizzaBlock({ info }) {
  const [size, setSize] = React.useState(0)
  const [type, setType] = React.useState(0);

    return (
      <div className="pizza-block">
        {/* <div className="pizza-block__rating">
          <span>{info.rating}</span>
        </div> */}
        <img className="pizza-block__image" src={info.image} alt="Pizza" />
        <h4 className="pizza-block__title">{"Пицца " + info.title}</h4>
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
          <Button outline></Button>
        </div>
      </div>
    );  
}