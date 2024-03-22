import React from 'react';
import Style from "../Shop-Products/ShortingShop.module.css"
import data from './ShopPoducts.json';
const FilterShop = () => {
  return (
    <>
      <div className={Style.shorting}>


        <div className={`row fixed-top ${Style.shortingDiv}`}>
          <div className="col-lg-3 border">
            <p class>Showing Product 1-10 Of 10 Result</p>
          </div>
          <div className="col-lg-3 border">
            <p>From</p>
          </div>
          <div className="col-lg-3 border">
            <select className={`${Style.customSelect} form-select`} aria-label="Default select example">
              <option selected>10 Products Per Page</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
              <option value="3">5</option>
            </select>
          </div>
          <div className="col-lg-3 border">
            <select className={`form-select ${Style.customSelect}`} aria-label="Default select example">
              <option selected>Shorting Item</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterShop

