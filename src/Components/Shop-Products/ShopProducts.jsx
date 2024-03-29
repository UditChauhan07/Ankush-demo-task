import React, { useState, useEffect } from 'react';
import Style from "../Shop-Products/ShopProducts.module.css";
import { useNavigate } from 'react-router-dom';
import { VscStarFull } from "react-icons/vsc";
import { RiStarLine } from "react-icons/ri";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import swal from 'sweetalert';
import data from './ShopPoducts.json';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";



const ShopProducts = () => {
    const navigate = useNavigate();
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [selectedRating, setSelectedRating] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState('');

    // Function to handle checkbox change
    const handleCheckboxChange = (label) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [label]: !prevState[label]
        }));
    };

    // Function to handle click on product //
    const handleClick = (id) => {
        if (id === 3) {
            navigate('/products');
        } else {
            showAlert();
        }
    };

    // Function to toggle display of category checkboxes //
    const toggleCheckboxes = () => {
        setShowCheckboxes(prevState => !prevState);
    };



    // Function to clear all filters
    const handleClearFilters = () => {
        setCheckedItems({});
        setSelectedRating([]);
        setSortType("");
        setProductsPerPage(10);
        setCurrentPage(1);


    };

    // Function to filter products based on checked categories and selected rating..//

    const filterProducts = () => {
        let filtered = data;
        if (Object.values(checkedItems).some(value => value)) {
            filtered = filtered.filter(product =>
                Object.keys(checkedItems).some(key => checkedItems[key] && product.categories.includes(key))
            );
        }
        if (selectedRating.length > 0) {
            filtered = filtered.filter(product => selectedRating.includes(product.rating));
        }
        return filtered;
    };

    // Function to show alert and reset filters....//

    const showAlert = () => {
        swal("No products found", "", "warning").then(() => {

            setCheckedItems({});
            setSelectedRating([]);
        });
    };
    useEffect(() => {
        if (filterProducts().length === 0) {
            showAlert();
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [checkedItems, selectedRating]);


    // ............Pagination  Start  .......// 
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filterProducts().slice(indexOfFirstProduct, indexOfLastProduct);

    const handleProductsPerPageChange = (e) => {
        const selectedValue = parseInt(e.target.value);
        setProductsPerPage(selectedValue);
        setCurrentPage(1);
    };

    const totalProducts = filterProducts().length;
    const maxOptions = Math.ceil(totalProducts / 10) * 10;
    const productsPerPageOptions = Array.from({ length: maxOptions / 10 }, (_, i) => (i + 1) * 10);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    const checkboxes = [
        { label: 'Skin' },
        { label: 'Joints' },
        { label: 'Heart' },
        { label: 'Immunity' },
        { label: 'Bones' },
        { label: 'Vision' }
    ];




    const sortedProducts = () => {
        let sorted = [...currentProducts];
        if (sortType === 'asc') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortType === 'desc') {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortType === 'highestRating') {
            sorted.sort((a, b) => b.rating - a.rating);
        } else if (sortType === 'lowestRating') {
            sorted.sort((a, b) => a.rating - b.rating);
        } else if (sortType === 'lowestReview') {
            sorted.sort((a, b) => {
                return a.reviews.split(" ")?.[0] - b.reviews.split(" ")?.[0]
            });


        }
        else if (sortType === 'highestReview') {
            sorted.sort((a, b) => {
                return b.reviews.split(" ")?.[0] - a.reviews.split(" ")?.[0]
            });


        }
        return sorted;
    };

    const getSortInfo = () => {
        switch (sortType) {
            case 'asc':
                return { name: '', icon: <FaSortAlphaDown /> };
            case 'desc':
                return { name: '', icon: <FaSortAlphaDownAlt /> };
            case 'highestRating':
                return { name: '', icon: <FaSortNumericUpAlt /> };
            case 'lowestRating':
                return { name: '', icon: <FaSortNumericDown /> };
            case 'highestReview':
                return { name: '', icon: <FaSortAmountDown /> };
            case 'lowestReview':
                return { name: '', icon: <FaSortAmountDownAlt /> };
            default:
                return { name: 'Sort Products', icon: null };
        }
    };

    const handleSortClick = (sortType) => {
        setSortType(sortType);
    };

    const sortInfo = getSortInfo();


    return (
        <>
            <section>
                <div className={`container-fluid  ${Style.productmain}`}>
                    <div className={Style.shorting}>
                        <div className={`row fixed-top ${Style.shortingDiv}`}>
                            <div className="col-lg-3 border">
                                <p className={Style.showingProducts}>
                                    Showing Products {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filterProducts().length)} of {filterProducts().length} Results
                                </p>
                            </div>
                            <div className="col-lg-3 border">
                                <p className={Style.showingProducts}>For Grid and List icon</p>
                            </div>
                            <div className="col-lg-3 border">
                                <select
                                    className={`${Style.customSelect} `} style={{ width: "100%" }}
                                    // aria-label="Products per page"
                                    value={productsPerPage}
                                    onChange={handleProductsPerPageChange}
                                >
                                    {productsPerPageOptions.map(option => (
                                        <option key={option}
                                            value={option}> {option} Products Per Page</option>
                                    ))}
                                </select>

                            </div>
                            <div className="col-lg-3 border">

                                <div className="dropdown">
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
                                            <Skeleton width={260} highlightColor='' className={Style.cardImgLoading} />
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
                        </div>

                    </div>


                    {totalProducts > productsPerPage && (
                        <div className={`pagination justify-content-center ${Style.PaginatenDiv}`}>
                            <button className={Style.preBtn} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Prev
                            </button>
                            {Array.from({ length: Math.ceil(totalProducts / productsPerPage) }, (_, i) => (
                                <button
                                    style={{ width: "30px" }}
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    className={`${Style.pageBtn} ${currentPage === i + 1 ? Style.active : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button className={Style.nextBtn} onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}>
                                Next
                            </button>
                        </div>
                    )}

                </div>

            </section>

        </>
    );
};

export default ShopProducts;
