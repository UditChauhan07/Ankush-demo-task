import React from "react";
import Style from "../Shop-Products/ShortingShop.module.css"


function Shorting() {
    return (
        <>
      
      <div className={` card ${Style.filterCard}`}>
            <div className={Style.mainDiv}>
                <div className={Style.filterName}>
                    <strong className={Style.filertText} >FILTERS</strong></div>
                <div className={Style.clearName}>  
                 <p className={Style.clear} style={{ cursor: "pointer" }} >Clear</p></div>
            </div>
            <button onClick={() => window.print()}>print</button>
        </div>
        </>



    );
}

export default Shorting;
