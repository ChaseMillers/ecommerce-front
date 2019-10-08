import React, { useState, useEffect } from "react";
import {
    getBraintreeClientToken,
    processPayment,
    createOrder
} from "../apiCore";
import { emptyCart } from "../cartHelpers";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
import "./Checkout.css"

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: ""
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, [userId, token]);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="button button-blue">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address;

    const buy = (event) => {
        event.preventDefault()
        validateFormAdress()
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        data.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                setData({ ...data, error: error.message });
            });
    };

    const validateFormAdress = () => {
        var x = document.forms["purchase-form"]["form-address"].value;
        if (x === "") {
        document.getElementById("address").style.display = "block";
          return false;
        }
        else
        document.getElementById("address").style.display = "none";
      }

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <form className="purchase-form" name="purchase-form">
                        <label className="address">Delivery address:</label>
                        <textarea
                            type="text"
                            aria-label="delivery address input"
                            onChange={handleAddress}
                            name="form-address"
                            className="address-input "
                            value={data.address}
                            placeholder="Type your delivery address here..."
                            required
                        />
                        <span 
                        className='address-alert'
                        id="address"
                        >Please fill out address</span>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <input type="submit" onClick={buy}  className="button"/>
                    </form>
                     
                    <div className="purchase-info"> 
                    <h1>To Test Payment Enter:</h1>
                    <ul>
                    <li>Card Number = 4111 1111 1111 1111</li>
                    <li>Expiration Date = 11/22</li>
                    <li>CVV = 123</li>
                    </ul>
                    </div>
                </div>
            ) : null}

        </div>
    );

    const showError = error => (
        <div
            className="caution "
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = success => (
        <div
            className="caution caution-text"
            style={{ display: success ? "" : "none" }}
        >
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading =>
        loading && <h1 className="red-text">Loading...</h1>;

    return (
        <div className="loading">
            <h1>Total: ${getTotal()}</h1>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
