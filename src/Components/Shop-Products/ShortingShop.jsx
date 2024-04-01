import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import data from './ShopPoducts.json';
import Style from "../Shop-Products/ShopProducts.module.css";

function Items({ currentItems }) {
    return (
        <div className="items">
            {currentItems &&
                currentItems.map((product) => (
                    <div key={product.id}>
                        <div className={Style.imgWrapper}>
                            <img className={Style.img} src={product.image} alt="" />
                        </div>
                    </div>
                ))}
        </div>
    );
}

function Shorting() {
    const itemsPerPage2 = 2;
    const [currentItems2, setCurrentItems2] = useState([]);
    const [pageCount2, setPageCount2] = useState(0);
    const [itemOffset2, setItemOffset2] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset2 + itemsPerPage2;
        console.log(`Loading items from ${itemOffset2} to ${endOffset}`);
        setCurrentItems2(data.slice(itemOffset2, endOffset));
        setPageCount2(Math.ceil(data.length / itemsPerPage2));
    }, [itemOffset2]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage2;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset2(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems2} />
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount2}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />


        </>
    );
}

export default Shorting;
