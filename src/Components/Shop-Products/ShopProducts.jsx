import React, { useState, useEffect, useRef } from 'react';
import Style from "../Shop-Products/ShopProducts.module.css";
import { useNavigate } from 'react-router-dom';
import { VscStarFull } from "react-icons/vsc";
import { RiStarLine } from "react-icons/ri";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import swal from 'sweetalert';
import data from './ShopPoducts.json';
// import data2 from '../Products/ProductsData/Details.json'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { PiPrinterBold } from "react-icons/pi";

// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
import { FaRegFilePdf } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { GrDocumentCsv } from "react-icons/gr";
import { IoDocumentOutline } from "react-icons/io5";
import { GrDocumentTxt } from "react-icons/gr";
import * as XLSX from "xlsx";
import Papa from 'papaparse';
import { usePDF } from 'react-to-pdf';
import { saveAs } from 'file-saver';

const ShopProducts = () => {

    // const targetRef = useRef();
    const ProductShow = 30;
    const PageLimit = 5;
    const componentRef = React.useRef();
    const navigate = useNavigate();
    const [showReactPaginate, setShowReactPaginate] = useState(true);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [selectedRating, setSelectedRating] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState('');
    const [productsPerPage, setProductsPerPage] = useState(ProductShow);
    const [selectedLine, setSelectedLine] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    // console.log(productsPerPage)
    const [pageRangeStart, setPageRangeStart] = useState(PageLimit);
    const [pageRangeEnd, setPageRangeEnd] = useState(9);
    // console.log(pageRangeEnd)
    const [viewMode, setViewMode] = useState("grid");
    const [isListView, setIsListView] = useState(false);

    const cardContainer = {

        color: 'blue',

        backgroundColor: 'lightgray',

    };
    // Function to toggle display of category checkboxes //
    const toggleCheckboxes = () => {
        setShowCheckboxes(prevState => !prevState);
    };

    // Function to handle checkbox change
    const handleCheckboxChange = (label) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [label]: !prevState[label]
        }));
        setCurrentPage(1);
    };

    // Function to handle click on product //
    const handleClick = (product) => {
        // if (id === 3) {
        //     navigate(`/products/${id}`);
        // } else {
        //     showAlert();
        // }
        // navigate(`/products/${id}`);
       
        // Navigate to the "/products" page and pass the product data as state
        navigate("/products", { state: { productData: product } });
    };

    // Function to clear all filters
    const handleClearFilters = () => {
        setCheckedItems({});
        setSelectedRating([]);
        setSortType("");
        setProductsPerPage(ProductShow);
        setCurrentPage(1);
        setSelectedLine(2)
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

    // Function to handle switch button change
    const handleSwitchChange = () => {
        setShowReactPaginate(prevState => !prevState);
    };

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
    const maxOptions = Math.ceil(totalProducts / ProductShow) * ProductShow;
    const productsPerPageOptions = Array.from({ length: maxOptions / ProductShow }, (_, i) => (i + 1) * ProductShow);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setCurrentPage(1);
        paginate(1);
    }, [selectedRating]);

    useEffect(() => {
        const newPageRangeStart = Math.floor((currentPage - 1) / PageLimit) * PageLimit;
        const newPageRangeEnd = Math.min(newPageRangeStart + 4, Math.ceil(totalProducts / productsPerPage) - 1);
        setPageRangeStart(newPageRangeStart);
        setPageRangeEnd(newPageRangeEnd);
    }, [currentPage, totalProducts, productsPerPage]);

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
            sorted.sort((a, b) => a.reviews.split(" ")?.[0] - b.reviews.split(" ")?.[0]);
        } else if (sortType === 'highestReview') {
            sorted.sort((a, b) => b.reviews.split(" ")?.[0] - a.reviews.split(" ")?.[0]);
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

    // Function to handle grid view click
    const handleGridView = () => {
        setViewMode("grid");
        setIsListView(false);
    };

    // Function to handle list view click
    const handleListView = () => {
        setViewMode("list");
        setIsListView(true);
    };
    //............Function  Grid-Line Handle UI..........

    const clickgridLine = (lineNumber) => {
        setSelectedLine(lineNumber);
    };

    //........Export pdf..........//

    const { toPDF, targetRef } = usePDF({
        filename: generatePDFFileName(),
    });

    function generatePDFFileName() {
        let prefix = "Products";
        const checkedLabels = Object.keys(checkedItems).filter(label => checkedItems[label]);
    
        if (checkedLabels.length > 0) {
            if (checkedLabels.length === 1) {
                prefix = `${checkedLabels[0]}'s Products`;
            } else if (checkedLabels.length === 2) {
                prefix = `${checkedLabels[0]}'s and ${checkedLabels[1]}'s Products`;
            } else {
                const lastLabel = checkedLabels.pop();
                const labelNames = checkedLabels.map(label => `${label}'s`).join(", ");
                prefix = `${labelNames} and ${lastLabel}'s Products`;
            }
        }
    
        let starPrefix = '';
        if (selectedRating.length > 0) {
            const sortedRatings = selectedRating.sort((a, b) => a - b);
            if (sortedRatings.length === 1) {
                starPrefix = `with ${sortedRatings[0]} star `;
            } else {
                starPrefix = `with ${sortedRatings.slice(0, -1).join(', ')} and ${sortedRatings.slice(-1)} star `;
            }
        }
    
        const currentDateAndTime = new Date();
    
        if (checkedLabels.length === 5 && selectedRating.length === 5) {
            return `Products ${currentDateAndTime}.pdf`;
        } else {
            return `${prefix} ${starPrefix}${currentDateAndTime}.pdf`;
        }
    }
    



    //..........Export data to Excel..........//
    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        let products = sortedProducts();
        let columns;
        let selectedLabels = Object.keys(checkedItems).filter(label => checkedItems[label]);
    
        if (viewMode === "grid") {
            products = products.map(product => ({
                "Title": product.title,
                "Rating": product.rating,
                "Reviews": product.reviews,
            }));
            columns = [{ wch: 50 }, { wch: 5 }, { wch: 10 }, { wch: 15 }];
        } else {
            products = products.map(product => ({
                "Title": product.title,
                "Rating": product.rating,
                "Reviews": product.reviews,
                "Price": product.price,
                "Text": product.text,
                "Variant": product.colorVeriont
            }));
            columns = [{ wch: 50 }, { wch: 5 }, { wch: 10 }, { wch: 10 }, { wch: 150 }, { wch: 15 }];
        }
    
        const worksheet = XLSX.utils.json_to_sheet(products);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        worksheet["!cols"] = columns;
    
        const currentDateAndTime = new Date();
    
        let filename;
        if (selectedLabels.length === Object.keys(checkedItems).length && selectedRating.length === 5) {
            filename = `Products ${currentDateAndTime}.xlsx`;
        } else {
            let filenamePrefix = "Products";
            if (selectedLabels.length > 0) {
                if (selectedLabels.length === 1) {
                    filenamePrefix = `${selectedLabels[0]}'s Products`;
                } else if (selectedLabels.length === 2) {
                    filenamePrefix = `${selectedLabels[0]}'s and ${selectedLabels[1]}'s Products`;
                } else {
                    const lastLabel = selectedLabels.pop();
                    const labelNames = selectedLabels.map(label => `${label}'s`).join(", ");
                    filenamePrefix = `${labelNames} and ${lastLabel}'s Products`;
                }
            }
    
            let starPrefix = '';
            if (selectedRating.length > 0) {
                const sortedRatings = selectedRating.sort((a, b) => a - b);
                if (sortedRatings.length === 1) {
                    starPrefix = `with ${sortedRatings[0]} star `;
                } else {
                    starPrefix = `with ${sortedRatings.slice(0, -1).join(', ')} and ${sortedRatings.slice(-1)} star `;
                }
            }
            filename = `${filenamePrefix} ${starPrefix} ${currentDateAndTime}.xlsx`;
        }
        XLSX.writeFile(workbook, filename);
    };
    
    


    //........Export data to Csv file ....//
   const exportToCSV = () => {
    let products = sortedProducts();
    let selectedLabels = Object.keys(checkedItems).filter(label => checkedItems[label]);

    let csvData;
    if (viewMode === "grid") {
        csvData = Papa.unparse(products.map(product => ({
            "Title": product.title,
            "Rating": product.rating,
            "Reviews": product.reviews,
        })));
    } else {
        csvData = Papa.unparse(products.map(product => ({
            "Title": product.title,
            "Rating": product.rating,
            "Reviews": product.reviews,
            "Price": product.price,
            "Text": product.text,
            "Variant": product.colorVeriont
        })));
    }

    const currentDateAndTime = new Date();

    let filename;
    if (selectedLabels.length === Object.keys(checkedItems).length && selectedRating.length === 5) {
        filename = `Products ${currentDateAndTime}.csv`;
    } else {
        let filenamePrefix = "Products";
        if (selectedLabels.length > 0) {
            if (selectedLabels.length === 1) {
                filenamePrefix = `${selectedLabels[0]}'s Products`;
            } else if (selectedLabels.length === 2) {
                filenamePrefix = `${selectedLabels[0]}'s and ${selectedLabels[1]}'s Products`;
            } else {
                const lastLabel = selectedLabels.pop();
                const labelNames = selectedLabels.map(label => `${label}'s`).join(", ");
                filenamePrefix = `${labelNames} and ${lastLabel}'s Products`;
            }
        }

        let starPrefix = '';
        if (selectedRating.length > 0) {
            const sortedRatings = selectedRating.sort((a, b) => a - b);
            if (sortedRatings.length === 1) {
                starPrefix = `with ${sortedRatings[0]} star `;
            } else {
                starPrefix = `with ${sortedRatings.slice(0, -1).join(', ')} and ${sortedRatings.slice(-1)} star `;
            }
        }
        filename = `${filenamePrefix} ${starPrefix} ${currentDateAndTime}.csv`;
    }

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};


    //...............Export Data to Doc.................//
    const exportToWord = () => {
        const generateWordContent = () => {
            let content = '';
            let products = sortedProducts();
    
            products.forEach(product => {
                if (viewMode === "grid") {
                    content += `<p><b>Title:</b>${product.title}\n</p> `;
                    content += `<p><b>Rating:</b>${product.rating}\n</p> `;
                    content += `<p><b>Reviews:</b> ${product.reviews}\n</p>`;
                } else {
                    content += `<p><b>Title:</b>${product.title}\n</p> `;
                    content += `<p><b>Rating:</b>${product.rating}\n</p> `;
                    content += `<p><b>Reviews:</b> ${product.reviews}\n</p>`;
                    content += `<p><b>Price:</b>${product.price}\n</p> `;
                    content += `<p><b>Text:</b>${product.text}\n</p>`;
                    content += `<p><b>Variant:</b>${product.colorVariant}\n\n</p> `;
                }
            });
            return content;
        };
    
        const wordContent = generateWordContent();
        const currentDateAndTime = new Date();
    
        let selectedLabels = Object.keys(checkedItems).filter(label => checkedItems[label]);
        let filenamePrefix = "Products";
        let filename = ''; 
    
        let starPrefix = '';
        if (selectedRating.length > 0) {
            const sortedRatings = selectedRating.sort((a, b) => a - b);
            if (sortedRatings.length === 1) {
                starPrefix = `with ${sortedRatings[0]} star `;
            } else {
                starPrefix = `with ${sortedRatings.slice(0, -1).join(', ')} and ${sortedRatings.slice(-1)} star `;
            }
        }
    
        if (selectedLabels.length === Object.keys(checkedItems).length && selectedRating.length === 5) {
            filename = `Products ${currentDateAndTime}.doc`;
        } else {
            if (selectedLabels.length > 0) {
                if (selectedLabels.length === 1) {
                    filenamePrefix = `${selectedLabels[0]}'s Products`;
                } else if (selectedLabels.length === 2) {
                    filenamePrefix = `${selectedLabels[0]}'s and ${selectedLabels[1]}'s Products`;
                } else {
                    const lastLabel = selectedLabels.pop();
                    const labelNames = selectedLabels.map(label => `${label}'s`).join(", ");
                    filenamePrefix = `${labelNames} and ${lastLabel}'s Products`;
                }
            }
            filename = `${filenamePrefix} ${starPrefix} ${currentDateAndTime}.doc`;
        }
        const blob = new Blob([wordContent], { type: 'application/msword' });
        saveAs(blob, filename);
    };
    
    

    //...........Export Data to Txt............

   const exportToTxt = () => {
    const generateWordContent = () => {
        let content = '';
        let products = sortedProducts();

        products.forEach(product => {
            if (viewMode === "grid") {
                content += `<p><b>Title:</b>${product.title}\n</p> `;
                content += `<p><b>Rating:</b>${product.rating}\n</p> `;
                content += `<p><b>Reviews:</b> ${product.reviews}\n</p>`;
            } else {
                content += `<p><b>Title:</b>${product.title}\n</p> `;
                content += `<p><b>Rating:</b>${product.rating}\n</p> `;
                content += `<p><b>Reviews:</b> ${product.reviews}\n</p>`;
                content += `<p><b>Price:</b>${product.price}\n</p> `;
                content += `<p><b>Text:</b>${product.text}\n</p>`;
                content += `<p><b>Variant:</b>${product.colorVariant}\n\n</p> `;
            }
        });
        return content;
    };

    const wordContent = generateWordContent();
    const currentDateAndTime = new Date();

    let selectedLabels = Object.keys(checkedItems).filter(label => checkedItems[label]);
    let filenamePrefix = "Products";
    let filename = '';
    let starPrefix = '';

    if (selectedRating.length > 0) {
        const sortedRatings = selectedRating.sort((a, b) => a - b);
        if (sortedRatings.length === 1) {
            starPrefix = `with ${sortedRatings[0]} star `;
        } else {
            starPrefix = `with ${sortedRatings.slice(0, -1).join(', ')} and ${sortedRatings.slice(-1)} star `;
        }
    }

    if (selectedLabels.length === Object.keys(checkedItems).length && selectedRating.length === 5) {
        filename = `Products ${currentDateAndTime}.txt`;
    } else {
        if (selectedLabels.length > 0) {
            if (selectedLabels.length === 1) {
                filenamePrefix = `${selectedLabels[0]}'s Products`;
            } else if (selectedLabels.length === 2) {
                filenamePrefix = `${selectedLabels[0]}'s and ${selectedLabels[1]}'s Products`;
            } else {
                const lastLabel = selectedLabels.pop();
                const labelNames = selectedLabels.map(label => `${label}'s`).join(", ");
                filenamePrefix = `${labelNames} and ${lastLabel}'s Products`;
            }
        }
        filename = `${filenamePrefix} ${starPrefix} ${currentDateAndTime}.doc`;
    }

    const blob = new Blob([wordContent], { type: 'application/msword' });
    saveAs(blob, filename);
};


    return (
        <>
            <section ref={targetRef}  >
                <div className="container-fluid"  >
                    <div className={Style.shorting}>
                        {true && <div className={`row  ${Style.shortingDiv}`}>
                            <div className="col-lg-3 col-sm-3 border">
                                <p className={Style.showingProducts}>
                                    Show Products {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filterProducts().length)} of {filterProducts().length} Results
                                </p>
                            </div>
                            <div className={`col-lg-3 col-3 border ${Style.GridDiv1}`}>
                                <div className={Style.bothIcon}>

                                    <span className={Style.showIcon} onClick={handleGridView}><BsGrid3X3GapFill /> </span>
                                    <span className={Style.showIcon} onClick={handleListView}>< FaListUl /></span>
                                </div>
                                {!isListView && (
                                    <div className={Style.gridLine}>
                                        <b className={selectedLine === 1 ? `${Style.two} ${Style.activeGridLine}` : `${Style.two} ${Style.inactiveGridLine}`} onClick={() => clickgridLine(1)}>||</b>&nbsp;
                                        <b className={selectedLine === 2 ? `${Style.three} ${Style.activeGridLine}` : `${Style.three} ${Style.inactiveGridLine}`} onClick={() => clickgridLine(2)}>|||</b>&nbsp;
                                        <b className={selectedLine === 3 ? `${Style.four} ${Style.activeGridLine}` : `${Style.four} ${Style.inactiveGridLine}`} onClick={() => clickgridLine(3)}>||||</b>&nbsp;
                                        <b className={selectedLine === 4 ? `${Style.five} ${Style.activeGridLine}` : `${Style.five} ${Style.inactiveGridLine}`} onClick={() => clickgridLine(4)}>|||||</b>
                                    </div>
                                )}
                            </div>
                            <div className={`col-lg-3 col-3 border ${Style.GridDiv}`}>
                                <div className={`dropdown ${Style.dropDown}`}>
                                    <button className={`dropdown-toggle ${Style.dropDiv}`}
                                        value={productsPerPage}
                                        onChange={handleProductsPerPageChange}
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                        {productsPerPage} Per page
                                    </button>
                                    <ul className={`dropdown-menu ${Style.opt}`} aria-labelledby="dropdownMenuButton1">
                                        {productsPerPageOptions.map(option => (
                                            <li>
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
                                <div className={`dropdown ${Style.dropDownExport}`} data-html2canvas-ignore="true">
                                    <button className={`dropdown-toggle ${Style.exportDropDiv}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                        Export
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" onClick={() => window.print()} >< PiPrinterBold /> Print</a></li>
                                        <li><a className="dropdown-item" onClick={() => toPDF()} ><FaRegFilePdf /> Pdf</a></li>
                                        <li><a className="dropdown-item" onClick={exportToExcel}><FaRegFileExcel /> Excel</a></li>
                                        <li><a className="dropdown-item" onClick={exportToCSV}><GrDocumentCsv /> Csv</a></li>
                                        <li><a className="dropdown-item" onClick={exportToWord} ><IoDocumentOutline /> Docx</a></li>
                                        <li><a className="dropdown-item" onClick={exportToTxt}><GrDocumentTxt /> Txt</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={Style.showingProducts2}>
                                <p >
                                    Show Products {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filterProducts().length)} of {filterProducts().length} Results
                                </p>
                            </div>
                        </div>}
                    </div>
                    <div className={Style.shorting2}>
                        <div className={`row  ${Style.shortingDiv2}`}>
                            <div className={` border ${Style.GridDiv}`}>
                                <p className={Style.showingProducts}>
                                    Show Products {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filterProducts().length)} of {filterProducts().length} Results
                                </p>
                            </div>
                            <div className={` border ${Style.GridDiv}`}>
                                <div className={Style.bothIcon}>

                                    <span className={Style.showIcon} onClick={handleGridView}><BsGrid3X3GapFill /> </span>
                                    <span className={Style.showIcon} onClick={handleListView}>< FaListUl /></span>
                                </div>
                                {!isListView && (
                                    <div className={Style.gridLine}>
                                        <b className={`two ${productsPerPage === 2 ? Style.activeGridLine : Style.inactiveGridLine}`} onClick={() => clickgridLine(1)}>||</b> <b className={`three ${productsPerPage === 3 ? Style.activeGridLine : Style.inactiveGridLine}`} onClick={() => clickgridLine(2)}>|||</b> <b className={`four ${productsPerPage === 4 ? Style.activeGridLine : Style.inactiveGridLine}`} onClick={() => clickgridLine(3)}>||||</b> <b className={`five ${productsPerPage === 5 ? Style.activeGridLine : Style.inactiveGridLine}`} onClick={() => clickgridLine(4)}>|||||</b>
                                    </div>
                                )}
                            </div>
                            <div className={` border ${Style.GridDiv}`}>
                                <div className={`dropdown ${Style.dropDown}`}>
                                    <button className={`dropdown-toggle ${Style.dropDiv}`}
                                        value={productsPerPage}
                                        onChange={handleProductsPerPageChange}
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                        {productsPerPage} Per page
                                    </button>
                                    <ul className={`dropdown-menu ${Style.opt}`} aria-labelledby="dropdownMenuButton1">
                                        {productsPerPageOptions.map(option => (
                                            <li>
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
                            <div className={` border ${Style.GridDiv}`}>
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
                                <div className={`dropdown ${Style.dropDownExport}`}>
                                    <button className={`dropdown-toggle ${Style.exportDropDiv}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                        Export
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" onClick={() => window.print()} >< PiPrinterBold /> Print</a></li>
                                        <li><a className="dropdown-item" onClick={exportToExcel}><FaRegFileExcel /> Excel</a></li>
                                        <li><a className="dropdown-item" onClick={exportToCSV}><GrDocumentCsv /> Csv</a></li>
                                        <li><a className="dropdown-item" >< IoDocumentOutline /> Doc</a></li>
                                        <li><a className="dropdown-item" onClick={exportToTxt}>< GrDocumentTxt /> Txt</a></li>
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
                    <div className="row w-100 ">
                        <div className="col-lg-3 col-md-3  mt-1" >
                            <h1 className={Style.heading2}>SHOP PRODUCTS</h1>
                            <div className={` card  ${Style.filterCard}`} >
                                <div className="row ">
                                    <div className={Style.mainDiv} >
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
                            <div className={` card  ${Style.filterCard2}`}>
                                <div className="row ">
                                    <div className={Style.mainDiv2}>
                                        <div className={`col-lg-8 col-md-8  ${Style.filtername}`}>
                                            <strong className={Style.filertText} onClick={toggleCheckboxes}>FILTERS</strong>
                                        </div>
                                        <div className={`col-lg-4 col-md-4 ${Style.clearname}`}>
                                            <p className={Style.clear} style={{ cursor: "pointer" }} onClick={handleClearFilters}>Clear</p>
                                            {/* <p className={Style.clear2} style={{ cursor: "pointer" }} onClick={handleClearFilters}>Clear</p> */}

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
                        {viewMode === "grid" ? (
                            <div className="col-lg-9 col-md-9" >
                                <div >
                                    <h1 className={Style.heading}>SHOP PRODUCTS</h1>
                                    <div className={Style.collection_Container} >
                                        <div className={`${Style.cardContainer}`} data-selected-line={selectedLine}>
                                            {loading ? (
                                                Array.from({ length: 10 }).map((_, index) => (
                                                    <Skeleton width={260} highlightColor='' className={Style.cardImgLoading} />
                                                ))
                                            ) : (
                                                sortedProducts().map((product, index) => (
                                                    <div key={index} className={`${Style.colactionCart}`} data-selected-line={selectedLine}  >
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
                                                            <button className={Style.buybtn} onClick={() => handleClick(product)}>{product.button}</button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {showReactPaginate ? (
                                    <div className={`${Style.paginateAgain}`} data-html2canvas-ignore="true" >
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
                                            previousClassName={`page-item ${Style.prevPage}`}
                                            previousLinkClassName={` ${Style.prevPageLink}`}
                                            nextClassName={`page-item ${Style.nextPage}`}
                                            nextLinkClassName={` ${Style.prevPageLink}`}
                                            containerClassName="pagination"
                                            activeClassName={`active ${Style.Active}`}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={2}
                                            forcePage={currentPage - 1}
                                        />
                                    </div>
                                ) : (
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
                            </div>
                        ) : (
                            <div className="col-lg-9 col-md-9">
                                <div >
                                    <h1 className={Style.heading}>SHOP PRODUCTS</h1>
                                    <div className={Style.collection_Container2}>
                                        <div className={Style.cardContainer2}>
                                            {loading ? (
                                                Array.from({ length: 10 }).map((_, index) => (
                                                    <Skeleton width={260} highlightColor='' className={Style.cardImgLoading} />
                                                ))
                                            ) : (
                                                sortedProducts().map((product, index) => (
                                                    <div key={index} className={`${Style.colactionCart2}`}>
                                                        <div className="row m-2 ">
                                                            <div className={` col-lg-3 col-md-3 ${Style.imgWrapper2}`}>
                                                                <img className={Style.img2} src={product.image} alt="" />
                                                            </div>
                                                            <div className='col-lg-9 col-md-3'>
                                                                <div className={Style.listCart}>
                                                                    <div className={Style.iconStar2}>
                                                                        {[...Array(5).keys()].map((i) => (
                                                                            <span key={i}>
                                                                                {i < product.rating ? (
                                                                                    <VscStarFull style={{ color: "rgb(244 172 12)", fontSize: "13px" }} />
                                                                                ) : (
                                                                                    <RiStarLine style={{ color: "#e6bf69", fontSize: "13px" }} />
                                                                                )}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                    <p className={Style.productText2}>{product.title}</p>
                                                                    <p className={Style.listText}>{product.text}</p>
                                                                    <strong className={Style.prices}>{product.price}</strong>
                                                                    <div>
                                                                        {[...Array(3).keys()].map((i) => (
                                                                            (product.colorVeriont >= i + 1) &&
                                                                            <button key={i} className={Style["colorBtn" + (i + 1)]}></button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {showReactPaginate ? (
                                    <div className={`${Style.paginateAgain}`} data-html2canvas-ignore="true" >
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
                                            previousClassName={`page-item ${Style.prevPage}`}
                                            previousLinkClassName={` ${Style.prevPageLink}`}
                                            nextClassName={`page-item ${Style.nextPage}`}
                                            nextLinkClassName={` ${Style.prevPageLink}`}
                                            containerClassName="pagination"
                                            activeClassName={`active ${Style.Active}`}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={2}
                                            forcePage={currentPage - 1}
                                        />
                                    </div>
                                ) : (
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
                            </div>
                        )}
                    </div>
                    <div className={`form-check form-switch  ${Style.toogelDiv}`}>
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={showReactPaginate} onChange={handleSwitchChange} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            All Page
                        </label>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopProducts;
