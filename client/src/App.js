import "./App.css";

import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";

import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import MenuBar from "./components/MenuBar";
import Product from "./components/Product";
import Brand from "./components/Brand";
import TopSeller from "./components/TopSeller";
import Question from "./components/Question";
import Wish from "./components/Wish";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [filter, setFilter] = useState({type : "", value : "" });

  return (
    <div className="App">
      <TopBar />
      <NavBar setFilter={setFilter}/>
      <MenuBar />
      <div className="my-5 container mx-auto">
        <Routes>
          <Route path="/" element={<Product filter={filter} setFilter={setFilter}/>} />
          <Route path="/product/detail/:id/wish/:wish" element={<ProductDetail />} />
          <Route path="/brands" element={<Brand />} />
          <Route path="/topsellers" element={<TopSeller />} />
          <Route path="/faq" element={<Question />} />
          <Route path="/wishlist" element={<Wish />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
