import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
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
                        <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="column-list">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="column-list">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="column-list">
                        <Link className="nav-link" to="/admin/products">
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

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="main-container"
        >
            <div className="row">
                <div className="user-links-layout">{adminLinks()}</div>
                <div className="user-info-layout">{adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
