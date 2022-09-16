import React from 'react'
import { useNavigate } from 'react-router-dom';
import { setTotalOfferCount, setTotalOfferPrice, clearCartList } from '../../redux/slices/itemListSlice';
import { useDispatch } from 'react-redux/es/exports';

type buttonSubmitProps = {
  searchParams?:URLSearchParams, text:string, to:string, disabled?:boolean, finish?:boolean, setWrongForm?:(value:boolean)=> void
}

export default function ButtonSubmit({searchParams, text, to, disabled, finish, setWrongForm}:buttonSubmitProps) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
      <button
        // disabled={disabled}
        type="submit"
        onClick={(evt) => {
          evt.preventDefault()
          if (disabled) {
            if (setWrongForm) setWrongForm(true);
            return
          }
            navigate(`/${to}?${searchParams}`);
            if (finish) {
                sessionStorage.setItem("cartList", "[]")
                sessionStorage.setItem("totalOfferPrice", "0");
                sessionStorage.setItem("totalOfferCount", "0");
                dispatch(clearCartList());
                dispatch(setTotalOfferCount());
                dispatch(setTotalOfferPrice());
          }
        }}
        className="button"
      >
        {text}
      </button>
    );
}
