import React from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <SideNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
