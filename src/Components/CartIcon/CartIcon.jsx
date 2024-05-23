import React, { useEffect, useState } from 'react';
import Style from "../CartIcon/CartIcon.module.css";
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem('cartData')) ?? [];
        let totalQuantity = existingData.reduce((acc, item) =>parseInt( acc) + parseInt(item.quantity), 0);
        setTotal(totalQuantity);
    }, [total]);

    const handleCart = () => {
        navigate('/cart');
    };

    return (
        <div>
            <icon className={Style.cartShow} onClick={handleCart}>
                <FaShoppingCart />
                <span className={Style.cartCount}>{total}</span>
            </icon>
        </div>
    );
};

export default CartIcon;

