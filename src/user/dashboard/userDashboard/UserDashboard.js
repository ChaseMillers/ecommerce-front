import React, { useState, useEffect } from "react";
import Layout from "../../../core/layout/Layout";
import { isAuthenticated } from "../../../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "../../apiUser";
import moment from "moment";
import './UserDashboard.css'

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
    }, [_id, token]);

    const userLinks = () => {
        return (
            <div className="dashboard">
                <h1 className="dash-header">User Links</h1>
                <ul className="column">
                    <li className="column-list">
                        <Link className="info-list-link" to={`/profile/${_id}`}>
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
                <h1 className="dash-header">User Information</h1>
                <ul className="column">
                    <li className="info-list">{name}</li>
                    <li className="info-list">{email}</li>
                    <li className="info-list">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="dashboard">
                <h1 className="dash-header">Purchase history</h1>
                <ul className="column">
                    <li className="info-list">
                        {history.map((h, i) => {
                            return (
                                <div key={i}>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div className="margin-bottom" key={i}>
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
