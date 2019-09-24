import React from 'react';
import Menu from '../menu/Menu';
import "./Layout.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="banner-container">
            <h1>{title}</h1>
            <p className="product-title">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;