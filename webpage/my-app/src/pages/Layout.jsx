import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../NavBar";
import '../App.css';

const Layout = () => {
    return (
        <>
            <header className="App-header">
                <Navbar />
                <Outlet />
            </header>
        </>
    );
}; 

export default Layout;
