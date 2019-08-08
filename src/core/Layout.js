import React from 'react'
import Menu from './Menu'
import '../styles.css';

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="banner-container">
            <h4>{title}</h4>
            <p className="product-title">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;