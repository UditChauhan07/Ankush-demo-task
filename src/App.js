
import ApiData from "./Components/ApiData/ApiData";
import ApiDetails from "./Components/ApiDetails/ApiDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataFilter from "./Components/MemoDataFilter/DataFilter";
import Products from "./Components/Products/Slider01A/Slider01A"
import ShopProducts from "./Components/Shop-Products/ShopProducts";
import ShortingShop from "./Components/Shop-Products/ShortingShop"
import CartProduct from "./Components/Products/CartProduct/CartProduct";
function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<ShopProducts />}></Route>
          <Route path="/apiData" element={<ApiData />}></Route>
          <Route path="/post/:postId" element={<ApiDetails />}></Route>
          <Route path="/data-filter" element={<DataFilter />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/cart" element={<CartProduct />}></Route>
          <Route path="/shorting-shop" element={<ShortingShop />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
