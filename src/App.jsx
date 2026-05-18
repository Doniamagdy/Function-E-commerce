import React from "react";
import "./App.css"; 
import {Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import FetchProducts from "./features/products/FetchProducts/FetchProducts";
import FetchSingleProduct from "./features/products/FetchSingleProduct/FetchSingleProduct";

function App() {
  return (
 <Routes> 
    <Route path="/" element={<MainLayout />} >

    <Route index element={<FetchProducts/>} />

    <Route path="/singleProduct/:productId" element={<FetchSingleProduct />} />
    
    </Route>
   </Routes>  
  );
}

export default App;
