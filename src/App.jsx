import React from "react";
import "./App.css"; 
import {Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import FetchProducts from "./features/dashboard/Products/FetchProducts/FetchProducts";

function App() {
  return (
 <Routes> 
    <Route path="/" element={<MainLayout />} >

    <Route path="/products" element={<FetchProducts/>} />
    
    </Route>
   </Routes>  
  );
}

export default App;
