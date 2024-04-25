import React from "react";
import Style from "../Shop-Products/ShortingShop.module.css"


function Shorting() {
    return (
        <>
         <div>
      <p>Try to <b>scroll</b> inside this frame to understand how sticky positioning works.</p>

      <div className={Style.sticky}>I am sticky!</div>

      <div style={{ paddingBottom: '2000px' }}>
        <p>In this example, the sticky element sticks to the top of the page (top: 0), when you reach its scroll position.</p>
        <p>Scroll back up to remove the stickyness.</p>
        <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
        <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
      </div>
    </div>
        </>



    );
}

export default Shorting;
