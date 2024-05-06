import React from "react";
import Style from "../Shop-Products/ShortingShop.module.css"

function Shorting() {

  return (
    <>

<button className={Style.animatedButton}>Hover Me</button>
      {/* {!isListView && (
                                    <div className={Style.gridLine}>
                                        <b className={`two ${productsPerPage === 2 ? Style.activeGridLine : Style.inactiveGridLine}`} onClick={() => clickgridLine(1)}>||</b> <b className={`three ${productsPerPage === 3 ? Style.activeGridLine : Style.inactiveGridLine}`} onClick={() => clickgridLine(2)}>|||</b> <b className={`four ${productsPerPage === 4 ? Style.activeGridLine : Style.inactiveGridLine}`} onClick={() => clickgridLine(3)}>||||</b> <b className={`five ${productsPerPage === 5 ? Style.activeGridLine : Style.inactiveGridLine}`} onClick={() => clickgridLine(4)}>|||||</b>
                                    </div>
                                )}
                            </div> */}
    </>
                                        // <b className={Style.two} onClick={() => clickgridLine(1)}>||</b> <b className={Style.three} onClick={() => clickgridLine(2)}>|||</b> <b className={Style.four} onClick={() => clickgridLine(3)}>||||</b> <b className={Style.five} onClick={() => clickgridLine(4)}>|||||</b>

  );
}

export default Shorting;
