import React from "react";
import Style from "../Shop-Products/ShortingShop.module.css"


function Shorting() {
    return (
        <>
      
            <h4 className={Style.h4name}>Shorting page</h4>
            <button onClick={() => window.print()} >Print</button>
        </>

// const exportPdf = () => {
//     const input = contentRef.current;
  
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
//       let position = 0;
//       let pageHeight = pdf.internal.pageSize.getHeight();
//       let remainingHeight = imgProps.height;
  
//       while (remainingHeight > 0) {
//         // Calculate height to fit on current page
//         const heightToPrint = Math.min(pageHeight, remainingHeight);
//         // Add current portion of image
//         pdf.addImage(imgData, "PNG", 0, position, pdfWidth, heightToPrint);
//         remainingHeight -= heightToPrint;
//         position += heightToPrint;
  
//         // Check if there's remaining content
//         if (remainingHeight > 0) {
//           pdf.addPage();
//         }
//       }
  
//       pdf.save("download.pdf");
//     });
//   };
  

,
{
    "id": 11,
       "image": "Images/fake1.avif",
    "title": "Zimone 90 V-Caps 30 servings",
    "rating": 5,
    "categories":["Skin","Bones"],
    "reviews": "28 Review",
    "button": "buy now",
    "price":"$200.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 12,
    "image": "Images/fake2.jpg",
    "title": "Ximone 30 servings 90 V-Caps",
    "rating": 4,
    "categories":["Joints","Heart","Immunity"],
    "reviews": "44 Review",
    "button": "BUY NOW",
    "price":"$95.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 13,
    "image": "Images/fake3.jpg",
    "title": "Bluerex Vision 60 SoftGels 30 Servings",
    "rating": 3,
    "categories":["Skin","Vision"],
    "reviews": "37 Review",
    "button": "BUY NOW",
    "price":"$39.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 14,
    "image": "Images/fake4.jpg",
    "title": "Cholestq10 60 V Caps 30 Servings",
    "rating": 2,
    "categories":["Skin","Heart","Vision"],
    "reviews": "16 Review",
    "button": "BUY NOW",
    "price":"$76.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."

},
{
    "id": 15,
    "image": "Images/fake15.avif",
    "title": "still-life-care-products_23-2149371308",
    "rating": 1,
    "categories":["Bones","Immunity","Vision"],
    "reviews": "22 review",
    "button": "PRE-ORDER",
    "price":"$38.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 16,
    "image": "Images/fake16.jpg",
    "title": "F_360_272372012_2aOG JaFmaqlkG CHSv",
    "rating": 5,
    "categories":["Bones","Immunity","Heart"],
    "reviews": "12 Review",
    "button": "PRE-ORDER",
    "price":"$34.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 17,
    "image": "Images/fake17.jpeg",
    "title": "Product Photography 5 Trends in 2023",
    "rating": 4,
    "reviews": "51 Review",
    "categories":["Skin","Immunity","Heart"],
    "button": "PRE-ORDER",
    "price":"$30.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
}, 
  {
    "id": 18,
    "image": "Images/fake8.jpg",
    "title": "pexels-kristina-paukshtite-3270223",
    "rating": 3,
    "categories":["Skin","Bones"],
    "reviews": "58 Review",
    "button": "buy now",
    "price":"$31.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 19,
    "image": "Images/fake9.jpg",
    "title": "products ima&gslcrp EgZjaHJvb",
    "rating": 2,
    "categories":["Joints","Heart","Immunity"],
    "reviews": "34 Review",
    "button": "BUY NOW",
    "price":"$22.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 20,
    "image": "Images/fake10.jpg",
    "title": "pexels-jefferson-palomique-3020129",
    "rating": 1,
    "categories":["Skin","Vision"],
    "reviews": "77 Review",
    "button": "BUY NOW",
    "price":"$23.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 21,
    "image": "Images/fake11.webp",
    "title": "pexels-photo-2633986",
    "rating": 5,
    "categories":["Skin","Bones"],
    "reviews": "66 Review",
    "button": "buy now",
    "price":"$12.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id":22,
    "image": "Images/fake12.jpeg",
    "title": "Zexels-photo-3259584 584 pexels",
    "rating": 4,
    "categories":["Joints","Heart","Immunity"],
    "reviews": "29 Review",
    "button": "BUY NOW",
    "price":"$20.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 23,
    "image": "Images/fake13.jpg",
    "title": "Bluerex Vision 60 SoftGels 30 Servings",
    "rating": 3,
    "categories":["Skin","Vision"],
    "reviews": "71 Review",
    "button": "BUY NOW",
    "price":"$12.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 24,
    "image": "Images/fake14.jpg",
    "title": "jam-beans-428094_1280_720_720",
    "rating": 2,
    "categories":["Skin","Heart","Vision"],
    "reviews": "100 Review",
    "button": "BUY NOW",
    "price":"$42.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."

},
{
    "id": 25,
    "image": "Images/fake15.jpg",
    "title": "coffee-beans-2258839_960_720",
    "rating": 1,
    "categories":["Bones","Immunity","Vision"],
    "reviews": "30 review",
    "button": "PRE-ORDER",
    "price":"$62.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 26,
    "image": "Images/fake16.jpg",
    "title": "istockphoto-1463681745-1024x1024",
    "rating": 5,
    "categories":["Bones","Immunity","Heart"],
    "reviews": "10 Review",
    "button": "PRE-ORDER",
    "price":"$87.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 27,
    "image": "Images/fake27.webp",
    "title": "ar Medicinals-1463681745-1024x1024",
    "rating": 4,
    "reviews": "40 Review",
    "categories":["Skin","Immunity","Heart"],
    "button": "PRE-ORDER",
    "price":"$90.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
}, 
  {
    "id": 28,
    "image": "Images/fake28.webp",
    "title": "A Bottle of Hemp Extract with Dropper",
    "rating": 3,
    "categories":["Skin","Bones"],
    "reviews": "50 Review",
    "button": "buy now",
    "price":"$39.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 29,
    "image": "Images/fake29.webp",
    "title": "Close-up of a Bottle of Hemp Oil",
    "rating": 2,
    "categories":["Joints","Heart","Immunity"],
    "reviews": "4 Review",
    "button": "BUY NOW",
    "price":"$30.00",
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    "id": 30,
    "image": "Images/fake30.jpeg",
    "title": "Assorted Beauty Products in a Bag",
    "rating": 1,
    "categories":["Skin","Vision"],
    "reviews": "59 Review",
    "button": "BUY NOW",
    "price":"$17.00",
    "color":3,
    "text":" Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit."
}

    );
}

export default Shorting;
