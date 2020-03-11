import React, { useState, useEffect } from "react";
import Layout from "../../core/layout/Layout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "../apiAdmin";
import moment from "moment";
import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <div className="total-orders">
                    <h1>Total orders: </h1>{orders.length}
                </div>
            );
        } else {
            return <h1 className="total-orders">No orders</h1>;
        }
    };

    const showInput = (key, value) => (
            <ul className="product-list-container">
                <li className="product-column-list">
                <span className="bold">{key} </span>{value}
                </li>
            </ul>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    alert("Status update failed",data.error);
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="orders-container">
            <select
                className="status-input"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            <div className="margin-bottom"><span className="bold">Status:</span> {o.status}</div>
        </div>
    );

    const Routes = () =>(
        <div className="routes-container">
        <Link
        className="route-link"
        to="/"
        >
        HOME 
      </Link>
      <div className="seperate">/</div> 
      <Link
        className="route-link"
        to="/admin/dashboard"
        >
        Dashboard 
      </Link>
        <div className="seperate">/</div> 
       Orders
      </div>
    )

    return (
        <Layout
            routes={Routes()}
            imageClassName="no-banner-image" 
            className="orders-container"
        >
            <div className="orders-row">
                <div className="orders-layout">
                    {showOrdersLength()}
                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="order-container"
                                key={oIndex}
                            >
                                <div className="order-id">
                                    <span className="highlight">Order ID: </span>
                                    <br/>{o._id}
                                </div>
                            
                                <div className= "order-column">
                                    <ul className="order-list-container">
                                        <li className="order-column-list">
                                            {showStatus(o)}
                                        </li>
                                        <li className="order-column-list">
                                            <span className="bold">Transaction ID:</span>{o.transaction_id}
                                        </li>
                                        <li className="order-column-list">
                                            <span className="bold">Amount:</span> ${o.amount}
                                        </li>
                                        <li className="order-column-list">
                                            <span className="bold">Ordered by:</span> {o.name}
                                        </li>
                                        <li className="order-column-list">
                                            <span className="bold">Order Date: </span>{" "}
                                            {moment(o.createdAt).fromNow()}
                                        </li>
                                        <li className="order-column-list">
                                            <span className="bold">Delivery address:</span> {o.address}
                                        </li>
                                    </ul>

                                    <div className="total-products-title">
                                        <span className="bold">Total products:</span>{" "}
                                        {o.products.length}
                                    </div>

                                    {o.products.map((p, pIndex) => (
                                        <div
                                            className="order-id-container"
                                            key={pIndex}
                                        >
                                            {showInput("Name:", p.name)}
                                            {showInput("Price:", p.price)}
                                            {showInput("Count:", p.count)}
                                            {showInput("Id:", p._id)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
