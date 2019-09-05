import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
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
                <h4 className="total-orders">
                    Total orders: {orders.length}
                </h4>
            );
        } else {
            return <h4 className="total-orders">No orders</h4>;
        }
    };

    const showInput = (key, value) => (
        <div className="show-input-container">
            <div className="show-input">
                <div className="show-input-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-orders-inputs"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="orders-container">
            <h4 className="cream-color margin-bottom">Status: {o.status}</h4>
            <select
                className="form-orders-inputs"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout
            title="Orders"
            description={`G'day ${
                user.name
            }, you can manage all the orders here`}
            className="orders-container"
        >
            <div className="orders-row">
                <div className="orders-layout">
                    {showOrdersLength()}

                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="margin-top"
                                key={oIndex}
                                style={{ borderBottom: "5px solid indigo" }}
                            >
                                <h4 className="margin-bottom">
                                    <span className="color-blue">
                                        Order ID: {o._id}
                                    </span>
                                </h4>

                                <ul className="column margin-bottom">
                                    <li className="column-list">
                                        {showStatus(o)}
                                    </li>
                                    <li className="column-list">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="column-list">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="column-list">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="column-list">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="column-list">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>

                                <h4 className="orders-margin">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h4>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="margin-bottom"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
