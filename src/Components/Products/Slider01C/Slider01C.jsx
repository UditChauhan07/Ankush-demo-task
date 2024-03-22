import React, { useState, useEffect } from "react";
import Style from "../Slider01C/Slider01C.module.css";
import { IoIosArrowDown } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fade } from 'react-reveal';

const Slider01C = () => {
  const [activeAccordion, setActiveAccordion] = useState("collapseTwo");
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const activeAccordionState = localStorage.getItem("activeAccordion");
    if (activeAccordionState) {
      setActiveAccordion(activeAccordionState);
    } else {
      setActiveAccordion("collapseTwo");
    }
    return () => {
      localStorage.removeItem("activeAccordion");
    };
  }, []);

  const handleAccordionChange = (accordionId) => {
    setActiveAccordion(accordionId);
    localStorage.setItem("activeAccordion", accordionId);
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const toggleInfo = () => {
    setShowInfo(!showInfo);
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

  return (
    <div
      className={`accordion ${Style.accordion}`}
      id="accordionExample"
      data-aos="zoom-in-up"
    >
      <div
        className={`accordion-item ${Style.accordionItem1} ${activeAccordion !== "collapseOne" ? Style.grayBackgorund : ""
          } ${activeAccordion === "collapseOne" ? Style.expanded : ""}`}
        onClick={() => handleAccordionChange("collapseOne")}
      >
        <input
          className={Style.icon1}
          type="radio"
          id="accordion-radio-1"
          name="accordion-radio"
          checked={activeAccordion === "collapseOne"}
        />
        <label
          className={`accordion-header ${Style.accordionHeader}`}
          htmlFor="accordion-radio-1"
        >
          ONE-TIME PURCHASE
          <p className={Style.price}>
            <sup className={Style.doloor}>$</sup>
            <span className={Style.money}>54</span>
            <sup className={Style.degree}>98</sup>
          </p>
        </label>
        <div
          id="collapseOne"
          className={` collapse ${Style.accordionCollapse} ${activeAccordion === "collapseOne" ? "show" : ""
            }`}

        >
          <div className={`accordion-body ${Style.accordionBody}`} >
            <div className={Style.stocDiv}>
              <h6 className={Style.stock}>In Stock.</h6>
              <div className={Style.customSelect}>
                <select className={Style.selectDiv}>
                  <option value="1" className={Style.qty}>
                    QTY: 1{" "}
                  </option>{" "}
                  <span style={{ color: "black" }}>
                    {" "}
                    1 Bluerex Vision 60 softgels
                  </span>
                  <option value="1">1</option>
                  <option value=" 2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <div className={Style.cartBtnDiv}>
              <button className={Style.cartBtn}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`accordion-item ${Style.accordionItem2} ${activeAccordion !== "collapseTwo" ? Style.grayBackgorund : ""
          } ${activeAccordion === "collapseTwo" ? Style.expanded2 : ""}`}
        onClick={() => handleAccordionChange("collapseTwo")}
      >
        <input
          className={Style.icon1}
          type="radio"
          id="accordion-radio-2"
          name="accordion-radio"
          checked={activeAccordion === "collapseTwo"}
        />
        <label
          className={`accordion-header ${Style.accordionHeader}`}
          htmlFor="accordion-radio-2"
        >
          SUBSCRIBE & SAVE 20%
          <p className={Style.price}>
            <sup className={Style.doloor}>$</sup>
            <span className={Style.money}>43</span>
            <sup className={Style.degree}>98</sup>
            <span className={Style.offer}> $54.98</span>
          </p>
          <div className={Style.ooferBtn}>
            <button className={Style.offer2}>Save $11.00</button>{" "}
            <span className={Style.sub}>with Subscription</span>
          </div>
        </label>
        <div
          id="collapseTwo"
          className={` collapse  ${Style.accordionCollapse} ${activeAccordion === "collapseTwo" ? "show" : ""
            }`}
        >
          <div className={`accordion-body ${Style.accordionBody2}`} 
          >
            <p className={Style.Ptext} >
              Don't miss this opportunity to save 20% on this order and all
              future subscribe and save orders.
            </p>
            <ul className={Style.liText}>
              <li>No Fees</li>
              <li>Cancel anytime</li>
            </ul>
            <div className={Style.accordion2}>
              <div className={Style.header} onClick={toggleAccordion}>
                Learn more{" "}
                <span className={Style.icon}>
                  <IoIosArrowDown />
                </span>
              </div>
              {isOpen && (
                <div className={Style.content}>
                  <Fade duration={2000}>
                  <p >
                    There is no commitment and no minimum to buy. Please note
                    exact shipment times may vary. To customize future shipments
                    and changes, access your account in the Bruno MD portal, or
                    email customer care department at
                    customercare@brunopharma.com.
                  </p>
                  </Fade>
                 
                  <div className={Style.pinfobtn}>
                    <p className={`text-center ${Style.subsContent}`}>
                      HOW SUBSCRIBE & SAVE WORKS
                    </p>
                    <img
                      className={Style.infoBtn}
                      src="Images/infoBtn.svg"
                      alt=""
                      onClick={toggleInfo}
                    />
                  </div>

                  {showInfo && (
                    <Fade duration={2000}>
                    <ul
                      className={Style.liContent}
                   
                    >
                      30 days after your first order is shipped, and then
                      approximately every 30 days thereafter, you will be sent a
                      new order of Bluerex. Each shipment will be charged to the
                      payment method you provide today in one payment at the low
                      price of $43.98 plus shipping and handling, unless you
                      cancel via the Bruno MD portal, or by contacting customer
                      care department.
                    </ul>
                    </Fade>
                  )}
                </div>
              )}
            </div>
            <div className={Style.stocDiv2}>
              <h6 className={Style.stock2}>In Stock.</h6>
              <div className={Style.customSelect2}>
                <select className={Style.selectDiv}>
                  <option value="1" className={Style.qty}>
                    QTY: 1{" "}
                  </option>{" "}
                  <span style={{ color: "black" }}>
                    {" "}
                    1 Bluerex Vision 60 softgels
                  </span>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <strong className={Style.delivery}>Delivery every:</strong>
            </div>
            <div className={Style.customSelect3}>
              <select className={Style.selectDiv}>
                <option value="1" className={Style.qty}>
                  30 Days{" "}
                </option>{" "}
                <span style={{ color: "black" }}>
                  {" "}
                  1 Bluerex Vision 60 softgels
                </span>
                <option value="Day 1">1</option>
                <option value="Day 2">2</option>
                <option value="Day 3">3</option>
              </select>
            </div>
            <div className={Style.subBtnDiv}>
              <button className={Style.subBtn}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider01C;
