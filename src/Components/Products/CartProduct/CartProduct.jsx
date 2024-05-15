import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Style from '../CartProduct/CartProduct.module.css'
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CartProduct = () => {
    const navigate = useNavigate();

    const data = useSelector((state) => state.product);
    const [addData, setAddData] = useState(data);

    const handlePromo= ()=>{
        toast.warning("Please Enter Promo code", {
            position: "top-center",
            transition: Slide,
            autoClose: 1500,
          });
    }

    const handleKeepShopping = () => {
        navigate("/")
    }
    return (
        <div className={`container-fluid ${Style.mainDiv}`}>
            <table className="table ">
                <thead >
                    <tr >
                        <th>Product Name</th>
                        <th style={{ width: "0%" }}>Quantity</th>
                        <th>Price</th>
                        <th>Updated Price</th>
                        <th>Update</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody style={{ borderStyle: "none" }}>
                    {addData.map((item) => (
                        <tr key={item.id} style={{ borderBottom: "transparent" }}>
                            <td >{item.title}</td>
                            <td >
                                <input type="number" className="" style={{ width: "100%" }} />
                            </td>
                            <td ><span>$</span>{item.price}<span>.00</span></td>
                            <td ><span>$</span>{item.price}<span>.00</span></td>
                            <td >
                                <button className={Style.updatBtn}>Update</button>
                            </td>
                            <td >
                                <button className={Style.removeBtn}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={Style.totalDiv}>
                <div className={Style.subTotalDiv}>
                    <p >Subtotal:</p>
                    <p ></p>
                </div>
            </div>
            <div className={Style.totalDiv}>
                <div className={Style.subTotalDiv}>
                    <p >Total:</p>
                    <p ></p>
                </div>
            </div>

            <div className={Style.promoDiv}>
                <div>
                    <input className={Style.promo} type="text" placeholder='Input Promo Code' />
                </div>
                <div >
                    <button className={Style.allBtn} onClick={handlePromo}>Apply Promo</button>
                </div>
                <div>
                    <button className={Style.allBtn}>Checkout</button>
                </div>
                <div>
                    <button className={Style.allBtn} onClick={handleKeepShopping}>Keep Shoping</button>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
};

export default CartProduct;
