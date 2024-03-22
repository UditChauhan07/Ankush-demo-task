import React, { useState, useMemo, useEffect } from "react";
import Style from "../MemoDataFilter/DataFilter.module.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const DataFilter = () => {
  const [myData, setMyData] = useState([]);
  const [perPage, setPerpage] = useState(10);
  const [currentPage, setcurrentPage] = useState(1);
  const [searchUserId, setSearchUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [searchPage, setSearchPage] = useState("");
  const [noData, setNoData] = useState(true);

  const shouldShowpagination = myData.length > perPage && !noData;

  useMemo(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setMyData(res.data);
      setOriginalData(res.data);
      setNoData(false);
      setTimeout(() => setLoading(false), 500);
    });
  }, []);

    //.............Pagination Start...........
    const indexLast = currentPage * perPage;
    const indeFpage = indexLast - perPage;
    const currentpostPage = myData.slice(indeFpage, indexLast);
  
    const PageNumber = [];
    for (var i = 1; i <= Math.ceil(myData.length / perPage); i++) {
      PageNumber.push(i);
    }
  
    //...........CurrentPage...............
    const PageShow = (num) => {
      // console.log('Clicked page Number',num)
      setcurrentPage(num);
    };
  
    //   ..........Next Page..........
    const Nextpage = () => {
      const lastpage = Math.ceil(myData.length / perPage);
      if (currentPage < lastpage) {
        var count = currentPage + 1;
        setcurrentPage(count);
      }
    };
    // .......................PrevPage.................................
    const Prevpage = () => {
      if (currentPage > 1) {
        var count = currentPage - 1;
        setcurrentPage(count);
      }
    };

  //..............Function Export Post Data to Excel.........////

  const exportToExcel = () => {
    if (noData) {
      toast.error("Data Not Found", {
        position: "top-center",
        transition: Slide,
        autoClose: 1500,
      });
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(myData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Post");

    const columns = [{ wch: 5 }, { wch: 5 }, { wch: 70 }, { wch: 200 }];
    worksheet["!cols"] = columns;

    let searchQuery = "";
    if (searchUserId) {
      searchQuery += `UserId ${searchUserId}`;
    }
    if (searchTitle) {
      if (searchQuery !== "") {
        searchQuery += " ";
      }
      searchQuery += `Title ${searchTitle}`;
    }

    const currentDate = new Date();
    const fileName = `Post ${searchQuery} ${currentDate}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };
  //..............Function Export Pagination Data to Excel.........////

  const PaginateDataToExcel = () => {
    if (noData) {
      toast.error("Data Not Found", {
        position: "top-center",
        transition: Slide,
        autoClose: 1500,
      });
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(currentpostPage);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PaginationData");

    const columns = [{ wch: 10 }, { wch: 10 }, { wch: 70 }, { wch: 200 }];
    worksheet["!cols"] = columns;

    let searchQuery = "";
    if (searchUserId) {
      searchQuery += `UserId-${searchUserId}`;
    }
    if (searchTitle) {
      if (searchQuery !== "") {
        searchQuery += " ";
      }
      searchQuery += `Title-${searchTitle}`;
    }

    const paginationStart = (currentPage - 1) * perPage + 1;
    const paginationEnd = Math.min(currentPage * perPage, myData.length);
    const paginationRange = `${paginationStart} -${paginationEnd}`;

    const currentDate = new Date();
    const fileName = `Paginate ${searchQuery} ${paginationRange} ${currentDate}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };



  //...............Filter Data With useMemo Hooks.............

  const filteredData = useMemo(() => {
    let data = originalData;

    if (selectedUserId) {
      data = data.filter((post) => post.userId.toString() === selectedUserId);
    }

    if (searchUserId) {
      data = data.filter((post) =>
        post.userId.toString().includes(searchUserId.trim())
      );
    }

    if (searchTitle) {
      data = data.filter((post) =>
        post.title.toLowerCase().includes(searchTitle.trim().toLowerCase())
      );
      
    }
   

    return data;
  }, [originalData, searchUserId, searchTitle, selectedUserId]);
  

  useEffect(() => {
    setMyData(filteredData);
    setNoData(filteredData.length === 0);
    setSearchPage("");
  }, [filteredData]);

  const handleSearchUserId = (e) => {
    setSearchUserId(e.target.value.trim());
  };

  const handleSearchTitle = (e) => {
    setSearchTitle(e.target.value.trim());
  };

  const handleSelectUserId = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleSearch = () => {
    let filteredData = originalData;

    if (selectedUserId) {
      filteredData = filteredData.filter(
        (post) => post.userId.toString() === selectedUserId
      );
    }

    if (searchUserId) {
      filteredData = filteredData.filter((post) =>
        post.userId.toString().includes(searchUserId.trim())
      );
    }

    if (searchTitle) {
      filteredData = filteredData.filter((post) =>
        post.title.toLowerCase().includes(searchTitle.trim().toLowerCase())
      );
     
    }

    setMyData(filteredData);
    setNoData(filteredData.length === 0);
    setSearchPage("");
  };
  

  const handlPageSearch = useMemo(() => {
    return (e) => {
      const pageValue = e.target.value.trim();
      setSearchPage(pageValue);
      const page = parseInt(pageValue);
      if (pageValue === "") {
        setNoData(false);
        setcurrentPage(1);
      } else if (
        isNaN(page) ||
        page > Math.ceil(myData.length / perPage) ||
        page <= 0
      ) {
        setNoData(true);
      } else {
        setNoData(false);
        setcurrentPage(page);
      }
    };
  }, [myData, perPage]);
  //.....................
  const handleReset = () => {
    setSearchTitle("");
    setSearchUserId("");
    setSelectedUserId("");
    setSearchPage("");
    setcurrentPage(1);
    setMyData(originalData);
    setNoData(false);
  };
  useEffect(() => {
    handleSearch();
  }, [searchUserId, searchTitle, selectedUserId]);

  return (
    <>
      <div className="container">
        <div className={Style.main}>
          <h1>Fiter Data With useMemo </h1>
        </div>
        <div className={Style.searchBar}>
          <input
            className={Style.sTitle}
            type="text"
            id="searchpage"
            placeholder="Search by page"
            value={searchPage}
            onChange={handlPageSearch}
          />
          <input
            className={Style.sTitle}
            type="text"
            id="searchId"
            placeholder="Search by userId"
            value={searchUserId}
            onChange={handleSearchUserId}
          />
          <input
            className={Style.sTitle}
            type="text"
            value={searchTitle}
            placeholder="Search by title"
            onChange={handleSearchTitle}
          />
          <select
            value={selectedUserId}
            onChange={handleSelectUserId}
            className={Style.selecteid}
          >
            <option value=""> Search select by userId </option>
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={(num + 1).toString()}>
                {num + 1}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-sm btn-danger ms-4 mb-1"
            onClick={handleReset}
          >
            Reset
          </button>
          <br />
        </div>
        <ToastContainer />
        <div>
          <button
            className={`btn btn-sm btn-primary  ${Style.exportBtn}`}
            onClick={exportToExcel}
          >
            Export Post-Data
          </button>
          <button
            className={`btn btn-sm btn-primary ms-2 ${Style.exportBtn}`}
            onClick={PaginateDataToExcel}
          >
            Export Paginate-Data
          </button>
        </div>
        {loading ? (
          <h1>Loading data ...</h1>
        ) : (
          <div>
            <table className="table  table-hover">
              <thead>
                <tr className={Style.head}>
                  <th>#</th>
                  <th>UserId</th>
                  <th>Title</th>
                  <th>Body</th>
                </tr>
              </thead>
              <tbody>
                {noData ? (
                  <tr>
                    <td colSpan="4">
                      <h1 className={Style.noData}> No Data Found..!!</h1>
                    </td>
                  </tr>
                ) : (
                  currentpostPage.map((post) => {
                    const { id, userId, title, body } = post;
                    return (
                      <tr key={id}>
                        <th className={Style.thborder}>{id}</th>
                        <td className={Style.thborder}>{userId}</td>
                        <td className={Style.thborder}>
                          {/* <Link to= {`/post/${post.userId}`} className={Style.titleBar} state={{userId:post.userId,title:post.title,body:post.body ,}}>{title}</Link> */}
                          <Link
                            to={{
                              pathname: `/post/${post.userId}`,
                              state: { currentPage: currentPage },
                            }}
                            className={Style.titleBar}
                            state={{
                              userId: post.userId,
                              title: post.title,
                              body: post.body,
                            }}
                          >
                            {title}
                          </Link>
                        </td>
                        <td className={Style.thborder}>{body}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {shouldShowpagination && (
        <nav
          aria-label="Page navigation example"
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <ul className={`pagination ${Style.pagibtn}`}>
            {" "}
            <li className="page-item">
              <a className="page-link" href="#" onClick={Prevpage}>
                Prev
              </a>
            </li>
            {PageNumber.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => PageShow(number)}
                >
                  {number}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" onClick={Nextpage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default DataFilter;
