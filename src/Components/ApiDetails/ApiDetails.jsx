import React, { useRef } from "react";
import Style from "../ApiDetails/ApiDetails.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

const ApiDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, title, body } = location.state;
  const contentRef = useRef(null);

  const exportPdf = () => {
    const input = contentRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  const userNames = {
    1: "Ankush",
    2: "Panwar",
    3: "Rahul",
    4: "Pankaj",
    5: "Suraj",
  };
  const userName = userNames[userId] || "Unknown";

  const hanleBack = () => {
    if (location.state && location.state.currentPage) {
    }
    navigate("/", { state: { page: location.state.currentPage } });
  };

  return (
    <>
 <div className={Style.display1} ref={contentRef}>
      <img className={Style.img} src="/card1.avif" alt=""  />

      <div className={Style.main}>
        <div className={Style.pdfkBtn} data-html2canvas-ignore="true">
          <button type="button" className="btn btn-warning" onClick={exportPdf}>
            PDF
          </button>
        </div>
        <div>
          <div className={`card ${Style.titleCard}`} >
            <h3 className={Style.head}>Title Details</h3>
            <h6 className={Style.username}>{userName}</h6>
            <hr />
            <strong className={Style.titleHead}>Title:-</strong>

            <p className={Style.titleText}>{title}</p>
            <hr />
            <strong className={Style.titleHead}>Body:-</strong>

            <p className={Style.titleText}>{body}</p>
            <div className={Style.backBtn} data-html2canvas-ignore="true">
              <button type="button" className="btn btn-success" onClick={hanleBack}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
   
    </>
   
    
    
  );
  
};

export default ApiDetails;