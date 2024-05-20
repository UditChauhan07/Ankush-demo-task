import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Style from '../CartProduct/CartProduct.module.css';
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { removeProduct } from '../../../features/ProductData/ProductSlice';

const CartProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product);
    // const qty = useSelector((state) => state.quanti);
    
    const [addData, setAddData] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [updatedPrice, setupdatedPrice] = useState(0)
    const [updateClicked, setUpdateClicked] = useState(false);
    
    const getProduct = JSON.parse(localStorage.getItem("cartData"))

    const handlePromo = () => {
        toast.warning("Please Enter Promo code", {
            position: "top-center",
            transition: Slide,
            autoClose: 1500,
        });
    }
    const handleKeepShopping = () => {
        navigate("/")
    }
    const handleRemoveProduct = (id) => {
        const updatedData = addData.filter(item => item.id !== id);
        localStorage.setItem('cartData', JSON.stringify(updatedData));
        dispatch(removeProduct(id));
        setSubtotal()
        setTotal()
        console.log("Product removed");
    };
    useEffect(() => {
        setAddData(getProduct);
    }, [data]);

    const handleQuantityChange = (event, id) => {
        const updatedQuantity = parseInt(event.target.value);
        const newQuantity = updatedQuantity < 1 ? 1 : updatedQuantity;
        const updatedData = addData.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, quantity: newQuantity };
                updatedItem.subtotal = updatedItem.quantity * updatedItem.price; // Calculate subtotal for the updated item
                return updatedItem;
            }
            return item;
        });
        setAddData(updatedData);
    };
    useEffect(() => {
        if (updateClicked) {
            const subtotalAmount = addData.reduce((acc, item) => acc + item.quantity * item.price, 0);
            setSubtotal(subtotalAmount);
            setTotal(subtotalAmount);
            setupdatedPrice(subtotalAmount)
            setUpdateClicked(false);
        }
    }, [addData, updateClicked]);
    const handleUpdateClick = () => {
        setUpdateClicked(true);
        localStorage.setItem('cartData', JSON.stringify(addData));
    };
    return (
        <div className={`container-fluid ${Style.mainDiv}`}>
            <table className="table" style={{ border: " transparent" }}>
                <thead className={Style.Thead} >
                    <th className={Style.productName}>Product Name</th>
                    <th style={{ width: "0%" }}>Quantity</th>
                    <th>&nbsp;Price</th>
                    <th>Updated Price</th>
                    <th>Update</th>
                    <th>Remove</th>
                </thead>
                <tbody className={Style.Tbody} style={{ borderStyle: "none" }}>
                    {addData.map((item, index) => (
                        <tr key={item.id}>
                            <td className={Style.TD}>{item.title}</td>
                            <td className={Style.TD}>
                                <input
                                    value={item.quantity}
                                    type="number"
                                    className=""
                                    style={{ width: "100%" }}
                                    onChange={(event) => handleQuantityChange(event, item.id)}
                                />
                            </td>
                            <td className={Style.TD}><span>&nbsp;$</span>{item.price}<span>.00</span></td>
                            <td className={Style.TD}><span>$</span>{(updatedPrice)}<span>.00</span></td>
                            <td className={Style.TD}><button className={Style.updatBtn} onClick={handleUpdateClick}>Update</button></td>
                            <td className={Style.TD}><button className={Style.removeBtn} onClick={() => handleRemoveProduct(item.id)}>X</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={Style.totalDiv}>
                <div className={Style.subTotalDiv}>
                    <p>Subtotal: <span>$</span>{subtotal}<span>.00</span></p>
                </div>
            </div>
            <div className={Style.totalDiv}>
                <div className={Style.subTotalDiv}>
                    <p>Total: <span>$</span>{total}<span>.00</span></p>
                </div>
            </div>
            <div className={Style.promoDiv}>
                <div>
                    <input className={Style.promo} type="text" placeholder='Input Promo Code' />
                </div>
                <div>
                    <button className={Style.allBtn} onClick={handlePromo}>Apply Promo</button>
                </div>
                <div>
                    <button className={Style.allBtn}>Checkout</button>
                </div>
                <div>
                    <button className={Style.allBtn} onClick={handleKeepShopping}>Keep Shopping</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CartProduct;
