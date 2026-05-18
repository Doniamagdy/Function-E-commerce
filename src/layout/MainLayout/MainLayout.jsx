import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function MainLayout() {
  return (
<div className="min-h-screen flex flex-col">
     <Navbar />
  
  <main className="mx-24 my-10 flex-grow">
        <Outlet />
      </main>
  
    <Footer />
    </div>
  );
}

export default MainLayout;
