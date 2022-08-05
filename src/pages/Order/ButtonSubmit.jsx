import React from 'react'
import { useNavigate } from 'react-router-dom';
import { setTotalOfferCount, setTotalOfferPrice, setCartList } from '../../redux/slices/itemListSlice';
import { useDispatch } from 'react-redux/es/exports';

export default function ButtonSubmit({searchParams, text, to, disabled, finish}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
      <button
        disabled={disabled}
        type="submit"
        onClick={() => {
            navigate(`/${to}?${searchParams}`);
            if (finish) {
                sessionStorage.setItem("cartList", [])
                sessionStorage.setItem("totalOfferPrice", 0);
                sessionStorage.setItem("totalOfferCount", 0);
                dispatch(setCartList({ clear: true }));
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
