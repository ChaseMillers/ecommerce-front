import React from "react";
import Layout from "../../../core/layout/Layout";
import { isAuthenticated } from "../../../auth";
import { Link } from "react-router-dom";
import './AdminDashboard.css'

const AdminDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="dashboard">
                <h1 className="dash-header">Admin Links</h1>
                <ul className="column">
                    <li className="column-list">
                        <Link className="info-list-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="column-list">
                        <Link className="info-list-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="column-list">
                        <Link className="info-list-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="column-list">
                        <Link className="info-list-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="dashboard">
                <h1 className="dash-header">User Information</h1>
                <ul className="column">
                    <li className="column-list">{name}</li>
                    <li className="column-list">{email}</li>
                    <li className="column-list">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const Routes = () =>(
        <div className="routes-container">
        <Link
        className="route-link"
        to="/"
        >
        HOME 
      </Link>
        <div className="seperate">/</div> 
        Dashboard
      </div>
    )

    return (
        <Layout
            routes={Routes()}
            imageClassName="no-banner-image"
            className="dash-container"
        >
            <div className="row">
                <div className="user-links-layout">{adminLinks()}</div>
                <div className="user-info-layout">{adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
