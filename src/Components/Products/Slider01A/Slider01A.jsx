import React,{useEffect} from "react";
import Style from "../Slider01A/Slider01A.module.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider01B from "../Slider01B/Slider01B";
import Slider01C from "../Slider01C/Slider01C";
import Slider01C2 from "../Slider01C2/Slider01C2";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Slider01A = () => {
  const onChange = (index) => {
    console.log(`Carousel slide changed to index ${index}`);
  };

  const onClickItem = (index, item) => {
    console.log(`Clicked on item ${index}: `, item);
  };

  const onClickThumb = (index) => {
    console.log(`Clicked on thumbnail ${index}`);
  };

  useEffect(() => {
    AOS.init({
      // offset: 200,
      duration: 1500,
      easing: 'ease-in-sine',
      // delay: 100,
    });
  }, [])


  return (
    <div className={`container-fluid mt-5   ${Style.productCart}`}>
      <div className="row">
        <div className={`col-lg-4   ${Style.part1}`}  data-aos="zoom-in-up">
          <p className={Style.stardiv}>
            BLUEREX VISION 60 SOFTGELS 30 SERVINGS
          </p>
          <Carousel 
    showArrows={true} 
    showStatus={false}
    showIndicators={false}
    autoPlay={true}
    infiniteLoop={true}
    onChange={onChange} 
    onClickItem={onClickItem} 
    onClickThumb={onClickThumb}
    className={Style.carousel}
  
>
    <div>
        <img className={Style.slidimg} src="Images/bruno1.webp" alt="Slide 1" />
       
    </div>
    <div>
    <img  className={Style.slidimg} src="Images/bruno2.webp" alt="Slide 1" />
     
    </div>
    <div>
    <img className={Style.slidimg} src="Images/bruno3.webp" alt="Slide 1" />
    
    </div>
    <div>
    <img className={Style.slidimg} src="Images/bruno4.webp" alt="Slide 1" />
        
    </div>
    <div>
    <img className={Style.slidimg} src="Images/bruno5.webp" alt="Slide 1" />
       
    </div>
    <div>
    <img className={Style.slidimg} src="Images/bruno6.webp" alt="Slide 1" />
       
    </div>
    <div>
    <img className={Style.slidimg} src="Images/bruno7.webp" alt="Slide 1" />
       
    </div>
    <div>
    <img className={Style.slidimg}  src="Images/bruno8.webp" alt="Slide 1" />
       
    </div>
    <div>
    <img className={Style.slidimg} src="Images/bruno9.webp" alt="Slide 1" />
       
    </div>
</Carousel>
        </div>
        <div className="col-lg-4"  >
          <Slider01B />
        </div>
        <div className="col-lg-4">
          <Slider01C2 />
          {/* <Slider01C/> */}
        </div>
      </div>
    </div>
  );
};

export default Slider01A;
