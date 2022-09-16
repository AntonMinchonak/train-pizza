import React from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import css from './DetailPage.module.scss'

// type defItem = {title:string
// image:string
//   price: number
//   sizes:number[]
// types:number[]
// category:number
// rating:number
// countOffer:number
// id:number}
export default function DetailPage() {
  const params: any = useParams();
  const items= useSelector((state:any) => state.list.list);
  const [size, setSize] = React.useState(0);
  const [type, setType] = React.useState(0);
  const info: any = items.find((item: { id: number }) => item.id === +params.id);

  if (!info) {
     return <div className="container">'Загрузка...'</div>
  }
  
  return (
    <div className="container">
      <Link className={css["go-back-btn"]} to="/">Назад</Link>
      <div className={css["pizza-block"]}>
        <img className={css["pizza-block__image"]} src={info.image} alt="Pizza" />
        <div className={css["pizza-block__info"]}>
          <h1 className={css["pizza-block__title"]}>{"Пицца " + info.title}</h1>

          <div className={css["pizza-block__selector"]}>
            <ul>
              {info.types.map((item: number, index: number) => {
                return (
                  <li onClick={() => setType(index)} className={type === index ? css["active"] : ""} key={index}>
                    {item === 0 ? "тонкое" : "традиционное"}
                  </li>
                );
              })}
            </ul>
            <ul>
              {info.sizes.map((item: number, index: number) => {
                return (
                  <li onClick={() => setSize(index)} key={index} className={size === index ? css["active"] : ""}>
                    {item} см.
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={css["pizza-block__description"]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat autem sunt eveniet at, similique aut laborum magnam praesentium magni, minima recusandae, consequuntur esse. Pariatur tenetur quod quae! Qui, facere minus?
          </div>
          <div className={css["pizza-block__bottom"]}>
            <div className={css["pizza-block__price"]}>{"от " + info.price + "₽"}</div>
            <Button outline info={info} size={size} type={type}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
