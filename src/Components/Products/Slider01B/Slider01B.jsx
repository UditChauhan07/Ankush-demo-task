import React,{useEffect} from 'react';
import Style from "../Slider01B/Slider01B.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Slider01B = () => {
  useEffect(() => {
    AOS.init({
      // offset: 200,
      duration: 1500,
      easing: 'ease-in-sine',
      once: true,
      // delay: 100,
    });
  }, [])
  return (
    <div className={`${Style.slider01B}`} data-aos="zoom-in-up">
      <p className={Style.stardiv}>BLUEREX VISION 60 SOFTGELS 30 SERVINGS</p>
      <div className={Style.reviewDiv}>
        <img className={Style.starImg} src="Images/starImg1.webp" alt="Star"/>
        <img className={Style.starImg} src="Images/starImg1.webp" alt="Star"/>
        <img className={Style.starImg} src="Images/starImg1.webp" alt="Star"/>
        <img className={Style.starImg} src="Images/starImg1.webp" alt="Star"/>
        <img className={Style.starImg} src="Images/starImg1.webp" alt="Star"/>
        <span className={Style.review}>7 Reviews</span>
      </div>
      <div className={Style.textarea}>
        <p>Bluerex Vision contains clinically proven ingredients to help protect your eyes from harmful blue light and alleviate Computer Vision Syndrome symptoms. The unique two-step process in our vision supplement helps reduce eye strain, improves focus recovery, and increases natural tear production for dry, itchy eyes. Next, Bluerex Vision builds natural pigments that help protect your eyes from blue light before it can damage the retina/macula.</p>
      </div>
    </div>
  );
};

export default Slider01B;