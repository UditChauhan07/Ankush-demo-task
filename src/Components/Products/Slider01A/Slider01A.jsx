import React, { useEffect, useState } from 'react';
import Style from '../Slider01A/Slider01A.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider01B from '../Slider01B/Slider01B';
import Slider01C2 from '../Slider01C2/Slider01C2';
import AOS from 'aos';
import 'aos/dist/aos.css';


import { useLocation } from 'react-router-dom';


import { useParams } from 'react-router-dom';

const Slider01A = () => {
  const params = useParams();
  const paramsId = parseInt(params.id);
  // const [productData, setProductData] = useState( Detail );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();
  // Check if location is not null before accessing its properties
  const productData = location?.state.productData;

  console.log("product data", productData);
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: 'ease-in-sine',
    });
  }, []);

  // useEffect(() => {
  //   const selectedProduct = productData.find((item) => item.id === paramsId);
  //   setSelectedProduct(selectedProduct);
  // }, [paramsId, productData]);




  return (
    <div className={`container-fluid mt-5 ${Style.productCart}`}>
      <div className="row">
        <div className={`col-lg-4 ${Style.part1}`} data-aos="zoom-in-up">
          <p className={Style.stardiv}>BLUEREX VISION 60 SOFTGELS 30 SERVINGS</p>
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            autoPlay={true}
            infiniteLoop={true}
            className={Style.carousel}
          >
           {
              productData && productData.images.map((item)=>{
                return(
                  <>
                    <img src={item} alt="" />
                  </>
                )
              })
           }
          </Carousel>
         
          {/* <img src={img} alt="ssss" /> */}
        
        </div>
        <div className="col-lg-4">
          <Slider01B data={ productData}  />
        </div>
        <div className="col-lg-4">
          <Slider01C2 data={ productData} />
        </div>
      </div>
    </div>
  );
};
export default Slider01A;
