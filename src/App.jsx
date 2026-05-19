import React from "react";
import "./App.css"; 
import {Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import FetchProducts from "./features/products/FetchProducts/FetchProducts";
import FetchSingleProduct from "./features/products/FetchSingleProduct/FetchSingleProduct";
import Cart from "./features/cart/Cart";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <> 
 <Routes> 
    <Route path="/" element={<MainLayout />} >

    <Route index element={<FetchProducts/>} />

    <Route path="/singleProduct/:productId" element={<FetchSingleProduct />} />

    <Route path="/cart" element={<Cart />} />
    
    </Route>
   </Routes>  
   <ToastContainer />
   </>
  );
}

export default App;
