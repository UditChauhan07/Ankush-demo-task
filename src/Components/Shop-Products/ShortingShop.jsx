import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import data from './ShopPoducts.json';
import Style from "../Shop-Products/ShopProducts.module.css";

function Items({ currentItems }) {
    return (
      <>
        {/* <section className={Style.fullContent}>
        <div className={`container-fluid  ${Style.productmain}`}>
            <div className={Style.shorting}>
                <div className={`row fixed-top ${Style.shortingDiv}`}>
                    <div className="col-lg-3 col-sm-3 border">
                        <p className={Style.showingProducts}>
                            Show Products {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filterProducts().length)} of {filterProducts().length} Results
                        </p>
                    </div>
                    <div className={`col-lg-3 col-3 border ${Style.GridDiv}`}>
                        <div className={Style.bothIcon}>
                            <span className={Style.showIcon}><BsGrid3X3GapFill /> <span className={Style.showIcon}>< FaListUl /></span></span>
                        </div>
                    </div>

                    <div className={`col-lg-3 col-3 border ${Style.GridDiv}`}>
                        <div className={`dropdown ${Style.dropDown}`}>
                            <button className={`dropdown-toggle ${Style.dropDiv}`}
                                value={productsPerPage}
                                onChange={handleProductsPerPageChange}
                                type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                {productsPerPage} Per Page
                            </button>
                            <ul className={`dropdown-menu ${Style.opt}`} aria-labelledby="dropdownMenuButton1">
                                {productsPerPageOptions.map(option => (
                                    <li key={option}>
                                        <button
                                            className="dropdown-item"
                                            onClick={(e) => handleProductsPerPageChange(e)}
                                            value={option}
                                        >
                                            {option} Per Page
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={`col-lg-3 col-3 border ${Style.GridDiv}`}>
                        <div className={`dropdown ${Style.dropDown}`}>
                            <button className={`dropdown-toggle ${Style.dropDiv}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                {sortInfo.icon} {sortInfo.name}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" onClick={() => handleSortClick('asc')}><FaSortAlphaDown /> A-Z</a></li>
                                <li><a className="dropdown-item" onClick={() => handleSortClick('desc')}><FaSortAlphaDownAlt /> Z-A</a></li>
                                <li><a className="dropdown-item" onClick={() => handleSortClick('highestRating')}><FaSortNumericUpAlt /> Highest-Rating</a></li>
                                <li><a className="dropdown-item" onClick={() => handleSortClick('lowestRating')}><FaSortNumericDown /> Lowest-Rating</a></li>
                                <li><a className="dropdown-item" onClick={() => handleSortClick('highestReview')}><FaSortAmountDown /> Highest-Review</a></li>
                                <li><a className="dropdown-item" onClick={() => handleSortClick('lowestReview')}><FaSortAmountDownAlt /> Lowest-Reviews</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={Style.showingProducts2}>
                        <p >
                            Show Products {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filterProducts().length)} of {filterProducts().length} Results
                        </p>
                    </div>
                </div>
            </div>
            <div className="row w-100 mt-5">
                <div className="col-lg-3 col-md-3  mt-1">
                    <h1 className={Style.heading2}>SHOP PRODUCTS</h1>
                    <div className={` card ${Style.filterCard}`}>
                        <div className="row ">
                            <div className={Style.mainDiv}>
                                <div className={`col-lg-8 col-md-8  ${Style.filtername}`}>
                                    <strong className={Style.filertText} onClick={toggleCheckboxes}>FILTERS</strong>
                                </div>
                                <div className={`col-lg-4 col-md-4 ${Style.clearname}`}>
                                    <p className={Style.clear} style={{ cursor: "pointer" }} onClick={handleClearFilters}>Clear</p>
                                </div>
                            </div>
                            <div className={Style.line1}><hr /></div>
                            <div className={Style.categories}>
                                <strong className={Style.catfilter} style={{ cursor: "pointer" }}>Categories</strong>
                            </div>
                            <div className={Style.categorycheck} style={{ marginLeft: "20px" }}>
                                {checkboxes.map((checkbox, index) => (
                                    <div key={index}>
                                        <input
                                            className=' ' style={{ cursor: 'pointer' }}
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            checked={checkedItems[checkbox.label] || false}
                                            onChange={() => handleCheckboxChange(checkbox.label)}
                                        />
                                        <label style={{ marginLeft: "10px", cursor: "pointer" }} htmlFor={`checkbox-${index}`}>{checkbox.label}</label>
                                    </div>
                                ))}
                            </div>
                            <div><hr style={{ width: "80%", margin: "20px", color: "#b3b1b193" }} /></div>
                            <div className={Style.categories}>
                                <strong className={Style.catfilter} style={{ cursor: "pointer" }} >Customer Rating</strong>
                            </div>
                            <div className={Style.ratingBody} style={{ marginLeft: "20px", marginBottom: "15px" }}>
                                {[...Array(5).keys()].map((index) => (
                                    <div key={index}>
                                        <label style={{ marginLeft: "20px", cursor: "pointer" }}>
                                            <input type="checkbox"
                                                className={Style.starcheck}
                                                value={5 - index}
                                                id='chekbox'
                                                checked={selectedRating.includes(5 - index)}
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    const rating = parseInt(value);
                                                    if (checked) {
                                                        setSelectedRating([...selectedRating, rating]);
                                                    } else {
                                                        setSelectedRating(selectedRating.filter(rating => rating !== parseInt(value)))
                                                    }
                                                }}
                                            />
                                            {[...Array(5 - index).keys()].map((i) => (
                                                <span id='starIcon' className={Style.starimg} key={i}>
                                                    <VscStarFull style={{ color: "rgb(244 172 12)" }} />
                                                </span>
                                            ))}
                                            {[...Array(index).keys()].map((i) => (
                                                <span id='starIcon' keys={5 - index + 1}>
                                                    <RiStarLine style={{ color: "#e6bf69" }} />
                                                </span>
                                            ))}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-9">
                    <h1 className={Style.heading}>SHOP PRODUCTS</h1>
                    <div className={Style.collection_Container}>
                        <div className={Style.cardContainer}>
                            {loading ? (
                                Array.from({ length: 10 }).map((_, index) => (
                                    <Skeleton key={index} width={260} highlightColor='' className={Style.cardImgLoading} />
                                ))
                            ) : (
                                sortedProducts().map((product, index) => (
                                    <div key={index} className={`${Style.colactionCart}`}>
                                        <div className={Style.imgWrapper}>
                                            <img className={Style.img} src={product.image} alt="" />
                                        </div>
                                        <p className={Style.productText}>{product.title}</p>
                                        <div style={{ height: "40px", display: "flex" }}>
                                            <div className={Style.iconStar}>
                                                {[...Array(5).keys()].map((i) => (
                                                    <span key={i}>
                                                        {i < product.rating ? (
                                                            <VscStarFull style={{ color: "rgb(244 172 12)" }} />
                                                        ) : (
                                                            <RiStarLine style={{ color: "#e6bf69" }} />
                                                        )}
                                                    </span>
                                                ))}
                                                <span className={Style.review}>{product.reviews}</span>
                                            </div>
                                        </div>
                                        <div className={Style.btnDiv}>
                                            <button className={Style.buybtn} onClick={() => handleClick(product.id)}>{product.button}</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>


                    {showReactPaginate && totalProducts > productsPerPage && (
                        <div className={`${Style.paginateAgain}`}>
                            <ReactPaginate
                                previousLabel="Prev"
                                nextLabel="Next"
                                pageCount={Math.ceil(totalProducts / productsPerPage)}
                                onPageChange={({ selected }) => {
                                    paginate(selected + 1);
                                    setCurrentPage(selected + 1);
                                }}
                                pageClassName={`page-item ${Style.pageItem}`}
                                pageLinkClassName={` ${Style.pageLink}`}
                                previousLinkClassName={` ${Style.prevPageLink}`}
                                nextClassName="page-item"
                                nextLinkClassName={` ${Style.prevPageLink}`}
                                containerClassName="pagination"
                                activeClassName={`active ${Style.Active}`}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                forcePage={currentPage - 1}
                            />
                        </div>
                    )}

                    {!showReactPaginate && totalProducts > productsPerPage && (
                        <div className={`pagination  ${Style.PaginatenDiv}`}>
                            <button className={Style.preBtn}
                                onClick={() => {
                                    if (currentPage > 1) {
                                        paginate(currentPage - 1);
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
                                disabled={currentPage === 1}>
                                Prev
                            </button>
                            {Array.from({ length: pageRangeEnd - pageRangeStart + 1 }, (_, i) => (
                                <button
                                    style={{ width: "30px" }}
                                    key={pageRangeStart + i + 1}
                                    onClick={() => {
                                        paginate(pageRangeStart + i + 1);
                                        setCurrentPage(pageRangeStart + i + 1);
                                    }}
                                    className={`${Style.pageBtn} ${currentPage === pageRangeStart + i + 1 ? Style.active : ''}`}
                                >
                                    {pageRangeStart + i + 1}
                                </button>
                            ))}
                            <button className={Style.nextBtn}
                                onClick={() => {
                                    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
                                        paginate(currentPage + 1);
                                        setCurrentPage(currentPage + 1);
                                    }
                                }}
                                disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}>
                                Next
                            </button>
                        </div>
                    )}

                    {totalProducts > productsPerPage && (
                        <div className={`form-check form-switch  ${Style.toogelDiv}`}>
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={showReactPaginate} onChange={handleSwitchChange} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                All Page
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section> */}
      </>

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
