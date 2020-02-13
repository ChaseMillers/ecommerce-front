import React from 'react';
import Menu from '../menu/Menu';
import "./Layout.css";
import Footer from "../footer/Footer"

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children,
}) => {

    return (
            <div>
                <Menu />
                <div className="content-container">
                <div className="banner-container">
                    <h1>{title}</h1>
                    <p className="website-description">{description}</p>
                </div>
                <div className={className}>{children}</div>
                <Footer />
                </div>
            </div>
    );}

export default Layout;