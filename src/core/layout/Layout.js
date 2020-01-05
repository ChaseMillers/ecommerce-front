import React, { Suspense, lazy } from 'react';
import Menu from '../menu/Menu';
import "./Layout.css";

import Footer from "../footer/Footer"

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
        <div>
            <Menu />
            <div className="content-container">
            <div className="banner-container">
                <h1>{title}</h1>
                <p className="product-title">{description}</p>
            </div>
            <div className={className}>{children}</div>
            <Footer />
            </div>
        </div>
);

export default Layout;