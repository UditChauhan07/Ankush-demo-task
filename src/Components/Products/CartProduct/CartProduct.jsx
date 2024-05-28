import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Style from '../CartProduct/CartProduct.module.css';

import { useNavigate } from 'react-router-dom';
import { removeProduct } from '../../../features/ProductData/ProductSlice';
import { FaLongArrowAltLeft } from "react-icons/fa";
import CartIcon from '../../CartIcon/CartIcon';

const CartProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product);
    // console.log("data----------->>>>", data)

    const [addData, setAddData] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [addDataQuantity, setAddDataQuantity] = useState([]); // State to store the subtotal

    // Fetch cart data from local storage on component mount
    useEffect(() => {
        const getProduct = JSON.parse(localStorage.getItem("cartData")) || [];
        setAddData(getProduct);
    }, []);
    // console.log("old Data------------>", data)

    const handleKeepShopping = () => {
        navigate("/");
    }
     // Function to handle removing a product from the cart
     const handleRemoveProduct = (id) => {
        const updatedData = addData.filter(item => item.id !== id);
        localStorage.setItem('cartData', JSON.stringify(updatedData));
        dispatch(removeProduct(id));
        setAddData(updatedData); // Update local state
    };


  
    // Function to handle changing quantity of a product
    const handleQuantityChange = (event, id) => {
        const updatedQuantity = event.target.value;
        const newQuantity = updatedQuantity < 1 ? 1 : updatedQuantity;
        const updatedData = addData.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, quantity: newQuantity };
                return updatedItem;
            }
            return item;
        });
        localStorage.setItem('cartData', JSON.stringify(updatedData));
        setAddData(updatedData); // Update local state
    };
    // Calculate subtotal whenever addData changes
    useEffect(() => {
        const subtotalAmount = addData.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        setSubtotal(subtotalAmount);

    }, [addData]);

    // console.log("add subtotal---------", addData)
    
    localStorage.setItem("cartQuantity", JSON.stringify(addDataQuantity))

    const handleAddQuantity = () => {
        // Calculat product  total quantity------------->//
        const totalQuantity = addData.reduce((total, product) => total + parseInt(product.quantity), 0);
        setAddDataQuantity(totalQuantity);
    };
    useEffect(() => {
        handleAddQuantity()
    }, [addData])

    console.log("addDataQuantity", addDataQuantity)
    return (
        <div className="container-fluid">
            <CartIcon />
            <div className={`cards ${Style.cardDiv}`} >
                <div className={Style.productDetails}>
                    <div>
                        <p className={Style.shopBtn} onClick={handleKeepShopping}><FaLongArrowAltLeft />Keep Shopping</p>

                    </div>

                    <div  >
                        {addData.length > 0 ? (
                            addData.map((item, index) => (
                                <div className={Style.itemDetails} key={item.id}>
                                    <div>
                                        <img className={Style.productimg} src={item.image} alt="" />
                                    </div>
                                    <div>
                                        <p className={Style.itemTitle}>{item.title}</p>
                                        <p className={Style.productPrice}> <span>$</span>{item.price}.00</p>
                                        <p className={Style.productTotalPrice}>Total: <span>$</span>{item.quantity * item.price}.00</p> {/* Subtotal */}
                                        <div className={Style.inptutRmove}>
                                            <div>
                                                <input
                                                    value={item.quantity}
                                                    type="number"
                                                    className={Style.inputDiv}
                                                    onChange={(event) => handleQuantityChange(event, item.id)}
                                                />
                                            </div>
                                            <div>
                                                <p className={Style.removeDiv}></p><span> <button className={Style.removeBtn} onClick={() => handleRemoveProduct(item.id)}>Remove</button></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1> Cart is empty</h1>
                        )}
                    </div>
                    <h5>Summary</h5>
                    <div className={Style.PriceContainer}>
                        <p>Subtotal: </p>
                        <strong><span>$</span>{subtotal}.00</strong>

                    </div>
                    <div>
                        <button className={Style.checkoutBtn}>Checkout</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartProduct;
