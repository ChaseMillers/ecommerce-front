import React from 'react';
import Menu from '../menu/Menu';
import "./Layout.css";
import Footer from "../footer/Footer"
import { Link } from 'react-router-dom';

const Layout = ({
    heroImage = "https://i.imgur.com/JUT81Za.png",
    imageClassName = "hero-image",
    className,
    children,
    link,
    routes,
}) => {

    return (
            <div>
                <Menu />
                <div className="content-container">
                <div className="routes">{routes}</div>
                <Link
                to={link}
                >
                <img 
                class={imageClassName} 
                src={heroImage}
                alt="title product"
                ></img>
                </Link>
                <div className={className}>{children}</div>
                <Footer />
                </div>
            </div>
    );}

export default Layout;