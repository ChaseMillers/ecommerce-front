import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="dashboard">
                <h4 className="product-header">User Links</h4>
                <ul>
                    <li>
                        <Link className="user-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li>
                        <Link className="user-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="dashboard">
                <h4 className="product-header">User Information</h4>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="dashboard">
                <h4 className="product-header">Purchase history</h4>
                <ul>
                    <li>
                        {history.map((h, i) => {
                            return (
                                <div>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <p>Product name: {p.name}</p>
                                                <p>
                                                    Product price: ${p.price}
                                                </p>
                                                <p>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
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
                <div className="user-links-layout">{userLinks()}</div>
                <div className="user-info-layout">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
