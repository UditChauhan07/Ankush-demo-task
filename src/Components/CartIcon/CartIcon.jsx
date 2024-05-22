import React from 'react'
import Style from "../CartIcon/CartIcon.module.css"
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
    const navigate = useNavigate();

    const handleCart = () => {
        navigate('/cart')
    }

    const existingData = JSON.parse(localStorage.getItem('cartData'))
    console.log("existingData------------>", existingData.length)
    return (
        <div>
            <icon className={Style.cartShow} onClick={handleCart}>
                <FaShoppingCart />
                <span className={Style.cartLength}>{existingData ? existingData.length : 0}</span>
            </icon>
        </div>
    )
}

export default CartIcon
