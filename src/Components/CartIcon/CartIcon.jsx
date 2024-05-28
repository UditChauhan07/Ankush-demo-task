import React, { useEffect, useState } from 'react';
import Style from "../CartIcon/CartIcon.module.css";
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";


const CartIcon = () => {

    const navigate = useNavigate();
    const totalQuantity=localStorage.getItem("cartQuantity")
    console.log("totalQuantity",totalQuantity)
    // const total = props.data ? props.data : 0;

    // const [total, setTotal] = useState(props.data);

  

    

    const handleCart = () => {
        navigate('/cart');
    };

    return (
        <div>
            <icon className={Style.cartShow} onClick={handleCart}>
                <FaShoppingCart />
                <span className={Style.cartCount}>{totalQuantity?totalQuantity:0}</span>
            </icon>
        </div>
    );
};

export default CartIcon;

