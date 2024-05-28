import React, { useState, useEffect } from 'react';
import Style from '../Slider01C2/Slider01C2.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Fade } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../features/ProductData/ProductSlice';
import { quantity } from '../../../features/ProductData/QuantitySlice';
import CartIcon from '../../CartIcon/CartIcon';

const Slider01C2 = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeAccordion, setActiveAccordion] = useState("collapseTwo");
    const [isOpen, setIsOpen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleAccordionChange = (accordionId) => {
        if (activeAccordion === accordionId) {
            return;
        }
        setActiveAccordion(accordionId);
    };

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };
    const addToCart = (data, quantity) => {
        const existingData = JSON.parse(localStorage.getItem('cartData')) || [];
        let updatedData = [...existingData];
        let found = false;
        updatedData = updatedData.map(item => {
            if (item.id === data.id) {
                item.quantity += parseInt(quantity);
                found = true;
            }
            return item;
        });
        if (!found) {
            updatedData.push({ ...data, quantity: quantity });
        }
        localStorage.setItem('cartData', JSON.stringify(updatedData));
        dispatch(addProduct(data, quantity));
        console.log("add data --> ", dispatch(addProduct(data, quantity)));
        setSelectedQuantity();
        navigate('/cart', { state: { quantity: quantity } });
        console.log("my Quantity--------> ", quantity)
    };

    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 1500,
            easing: 'ease-in-sine',
            delay: 100,
            once: true,
        });
    }, [])

    if (!props.data) {
        return null;
    }

    const handleQuantityChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setSelectedQuantity(selectedValue);
        console.log('Selected Quantity:', selectedValue);
        dispatch(quantity(selectedValue))
    };


    return (
        <>
        <div className={Style.forCartIcon}>
        <CartIcon/>
        </div>

            <div className={`mt-5 accordion ${Style.AccordianDiv}`}
                id="accordionExample"
                data-aos="zoom-in-up" >
                <div
                    className={`accordion-item ${Style.accordionItem2} ${activeAccordion !== 'collapseOne' ? Style.grayBackgorund : ''}`}
                    onClick={() => handleAccordionChange('collapseOne')}
                >
                    <h5 className={`accordion-header ${Style.accordianHeader}`} >
                        <div >
                            <input className={Style.RadioButton} type="radio" checked={activeAccordion === 'collapseOne'} />
                            <div
                                className={`accordion-body ${Style.accordionButton}`}
                                style={{ marginLeft: '20px', marginTop: "-40px" }}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                            >
                                ONE-TIME PURCHASE

                                <div className={Style.price}>
                                    <span className={Style.dollar}>$</span>
                                    <span className={Style.mainPrice}>{props.data.price}</span>
                                    <span className={Style.cents}>.00</span>

                                </div>
                            </div>
                        </div>
                    </h5>
                    {/* ${activeAccordion === "collapseTwo" ? "show" : ""  */}
                    <div
                        id="collapseTwo"
                        className={` accordion-collapse collapse ${Style.accordionCollapse}  }`} aria-labelledby="headingOne" data-bs-parent="#accordionExample"
                    >
                        <div className={`accordion-body ${Style.accordionBody}`}>
                            <div className={Style.stocDiv}>
                                <h6 className={Style.stock}>In Stock.</h6>
                                <div className={Style.customSelect}>
                                    <select className={Style.selectDiv} value={selectedQuantity} onChange={handleQuantityChange}>
                                        <option value="1" className={Style.qty} >
                                            QTY: 1
                                        </option>
                                        <span style={{ color: 'black' }}> 1 Bluerex Vision 60 softgels</span>
                                        {props.data.quantity.map((qty, index) => (
                                            <option key={index} value={parseInt(qty.qty)}>{qty.qty}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={Style.cartBtnDiv}>
                                <button className={Style.cartBtn} onClick={() => addToCart(props.data, selectedQuantity)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`accordion-item ${Style.accordionItem2} ${activeAccordion !== 'collapseTwo' ? Style.grayBackgorund : ''}`}
                    onClick={() => handleAccordionChange('collapseTwo')}
                >
                    <h5 className={`accordion-header ${Style.accordianHeader}`} id="headingOne">
                        <input className={Style.RadioButton} type="radio" checked={activeAccordion === 'collapseTwo'} />
                        <div
                            className={`accordion-body ${Style.accordionButton}`}
                            style={{ marginLeft: '20px', marginTop: "-40px" }}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            SUBSCRIBE & SAVE 20%

                            <div className={Style.priceDiv}>
                                <div className={Style.price2}>
                                <span className={Style.dollar}>$</span>
                                    <span className={Style.mainPrice}>{props.data.subscription}</span>
                                    <span className={Style.cents}>.00</span>
                                    <span className={Style.offer}>${props.data.price.toFixed(2)}</span>
                                </div>
                                <div className={Style.ooferBtn}>
                                    <button className={Style.offer2}>Save $11.00</button>{' '}
                                    <span className={Style.sub}>with Subscription</span>
                                </div>
                            </div>
                        </div>
                    </h5>
                    <div
                        id="collapseOne"
                        className={` accordion-collapse collapse show  ${Style.accordionCollapse} 
                            }`} aria-labelledby="headingTwo" data-bs-parent="#accordionExample"
                    >
                        <div className={`accordion-body ${Style.accordianBody}`}>
                            <p className={Style.Ptext}>
                                Don't miss this opportunity to save 20% on this order and all future subscribe and save orders.
                            </p>
                            <ul className={Style.liText}>
                                <li>No Fees</li>
                                <li>Cancel anytime</li>
                            </ul>
                            <div className={Style.learnMoreBody}>
                                <p className={Style.learn} onClick={toggleAccordion}>
                                    Learn more <span className={Style.icon}> <IoIosArrowDown /></span>
                                </p>
                            </div>
                            {isOpen && (
                                <div className={Style.content}>
                                    <Fade duration={2000} >
                                        <p data-aos="zoom-in" >
                                            There is no commitment and no minimum to buy. Please note exact shipment times may vary. To customize future shipments and changes, access your account in the Bruno MD portal, or email customer care department at customercare@brunopharma.com.
                                        </p>
                                    </Fade>

                                    <div className={Style.pinfobtn}>
                                        <p className={Style.subsContent} >
                                            HOW SUBSCRIBE & SAVE WORKS <span> <img className={Style.infoBtn} src="Images/infoBtn.svg" alt="" onClick={toggleInfo} /></span>
                                        </p>
                                    </div>
                                    {showInfo && (
                                        <Fade >
                                            <ul className={Style.liContent} data-aos="zoom-in"  >
                                                30 days after your first order is shipped, and then approximately every 30 days thereafter, you will be sent a new order of Bluerex. Each shipment will be charged to the payment method you provide today in one payment at the low price of $43.98 plus shipping and handling, unless you cancel via the Bruno MD portal, or by contacting customer care department.
                                            </ul></Fade>
                                    )}
                                </div>
                            )}
                            <div className={Style.stocDiv2}>
                                <h6 className={Style.stock2}>In Stock.</h6>
                                <div className={Style.customSelect2}>
                                <select className={Style.selectDiv} value={selectedQuantity} onChange={handleQuantityChange}>
                                        <option value="1" className={Style.qty} >
                                            QTY: 1
                                        </option>
                                        <span style={{ color: 'black' }}> 1 Bluerex Vision 60 softgels</span>
                                        {props.data.quantity.map((qty, index) => (
                                            <option key={index} value={qty.qty}>{qty.qty}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-2">
                                <strong className={Style.delivery}>Delivery every:</strong>
                            </div>
                            <div className={Style.customSelect3}>
                                <select className={Style.selectDiv}>
                                    <option value="1" className={Style.qty}>
                                        30 Days{' '}
                                    </option>{' '}
                                    <span style={{ color: 'black' }}> 1 Bluerex Vision 60 softgels</span>
                                    <option value="Day 1">1</option>
                                    <option value="Day 2">2</option>
                                    <option value="Day 3">3</option>
                                </select>
                            </div>
                            <div className={Style.subBtnDiv}>
                                <button className={Style.subBtn} >Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slider01C2;
