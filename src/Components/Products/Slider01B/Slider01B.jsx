import React, { useEffect } from 'react';
import Style from "../Slider01B/Slider01B.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { VscStarFull } from "react-icons/vsc";
import { RiStarLine } from "react-icons/ri";

const Slider01B = (props) => {
  console.log(props.data)

  useEffect(() => {
    AOS.init({
      // offset: 200,
      duration: 1500,
      easing: 'ease-in-sine',
      once: true,
      // delay: 100,
    });
  }, [])
  // console.log("Data",data)
  if (!props.data) {
    return null;
  }
  return (
    <div className={`${Style.slider01B}`} data-aos="zoom-in-up">
      <p className={Style.stardiv}>{props.data.title}</p>
      <div style={{ height: "40px" }}>
        <div className={Style.iconStar}>
          {[...Array(5).keys()].map((i) => (
            <span key={i}>
              {i < props.data.rating ? (
                <VscStarFull style={{ color: "rgb(244 172 12)" }} />
              ) : (
                <RiStarLine style={{ color: "#e6bf69" }} />
              )}
            </span>
          ))}
          <span className={Style.review}>{props.data.reviews}</span>
        </div>
      </div>
      
      
      <div className={Style.textarea}>
        <p>Bluerex Vision contains clinically proven ingredients to help protect your eyes from harmful blue light and alleviate Computer Vision Syndrome symptoms. The unique two-step process in our vision supplement helps reduce eye strain, improves focus recovery, and increases natural tear production for dry, itchy eyes. Next, Bluerex Vision builds natural pigments that help protect your eyes from blue light before it can damage the retina/macula.</p>
      </div>
    </div>
  );
};

export default Slider01B;