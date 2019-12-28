import React, { useState, useEffect } from "react";
import Country from "./Countries"
import {
    getBraintreeClientToken,
    processPayment,
    createOrder
} from "../apiCore";
import { emptyCart, itemTotal } from "../cartHelpers";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import "./Checkout.css"

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        email: "",
        name: "",
        address: "",
        apt: "",
        city: "",
        zip: "",
        state: "",
        country: "",
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

    const handleEmail = event => {
        setData({ 
            ...data, 
            email: event.target.value
        });
    };
    const handleName = event => {
        setData({ 
            ...data, 
            name: event.target.value,
        });
    };
    const handleAddress = event => {
        setData({ 
            ...data, 
            address: event.target.value,
        });
    };
    const handleApt = event => {
        setData({ 
            ...data, 
            apt: event.target.value,
        });
    };
    const handleCity = event => {
        setData({ 
            ...data, 
            city: event.target.value,
        });
    };
    const handleZip = event => {
        setData({ 
            ...data, 
            zip: event.target.value,
        });
    };
    const handleState = event => {
        setData({ 
            ...data, 
            state: event.target.value,
        });
    }; 
    const handleCountry = (event) => {
        setData({ 
            ...data, 
            country: event.target.value,
        });
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="button">Sign in to checkout</button>
            </Link>
        );
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        event.persist();
        buy()
      };

    let name = data.name;
    let deliveryAddress = data.address;
    let apt = data.apt;
    let city = data.city
    let zip = data.zip
    let state = data.state
    let email = data.email
    let country = data.country
    const buy = () => {
        if (deliveryAddress !== undefined){
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
                    amount: itemTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            email: email,
                            name: name,
                            address: deliveryAddress,
                            apt: apt,
                            city: city,
                            zip: zip,
                            state: state,
                            country: country
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
        }
    }

    const showDropIn = () => (
    //onBlur means when you click somewhere on the page, the data error will empty. 
        <div onBlur={() => setData({ ...data, error: "" })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                <form onSubmit={handleSubmit}>

                    <div className="full-address-bar">
                        <label className="address">
                            Email
                            <span class="required"> *</span>
                        </label>
                        <div class="email-address">
                            <textarea autocomplete="email" 
                            class="form-control" 
                            placeholder="Enter your email" 
                            required 
                            type="email"
                            onChange={handleEmail}   
                            value={data.email}
                            />
                        </div>
                    </div>

                    <div class="shipping-address">
                        <div className="full-address-bar">
                            <div class="address">
                            Ship to
                            </div>
                            <label className="address-title">
                                Full name
                                <span class="required"> *</span>
                            </label>
                            <textarea 
                                class="form-control" 
                                maxlength="30" 
                                placeholder="Enter your full name" 
                                required
                                type="text"
                                onChange={handleName}   
                                value={data.name}
                            />
                        </div>
                        <div className="long-address-bar">
                            <label className="address-title">
                                Street address (shipping)
                                <span class="required"> *</span>
                            </label>
                            <textarea
                                class="form-control" 
                                maxlength="28" 
                                placeholder="Address" 
                                required
                                type="text"
                                onChange={handleAddress}   
                                value={data.address}
                            />
                        </div>
                        
                        <div className='mini-address-bar'>
                            <label className="address-title">
                                Apt./Suite
                            </label>
                            <textarea
                                class="form-control" 
                                maxlength="28" 
                                placeholder="Apt./Suite" 
                                type="text"
                                onChange={handleApt}   
                                value={data.apt}
                            />
                        </div>

                        <div className="long-address-bar">
                            <label className="address-title">
                                City
                                <span class="required"> *</span>
                            </label>
                            <textarea 
                                class="form-control" 
                                maxlength="25" 
                                placeholder="City" 
                                required
                                type="text"
                                onChange={handleCity}   
                                value={data.city}
                            />
                        </div>

                        <div className='mini-address-bar'>
                            <label className="address-title">
                                Postal code
                                <span class="required"> *</span>
                            </label>
                            <textarea 
                                class="form-control" 
                                maxlength="15" 
                                placeholder="ZIP" 
                                required
                                type="text"
                                onChange={handleZip}   
                                value={data.zip}
                            />
                        </div>

                        <div className="half-address-bar">
                            <label className="address-title">
                                State or Province
                                <span class="required"> *</span>
                            </label>
                            <textarea
                                class="form-control" 
                                autocomplete="off" 
                                maxlength="25" 
                                placeholder="State" 
                                required
                                type="text"
                                onChange={handleState}   
                                value={data.state}
                            />
                        </div>

                        <div className='half-address-bar'>
                            <label className="address-title">
                                Country 
                                <span class="required"> *</span>
                            </label>
                                <Country 
                                handleCountry={handleCountry} 
                                data={data}/>
                        </div>

                    </div>
                    <div className="error">{data.error}</div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault',
                                displayName: 'e-commerce',
                                buttonStyle: {
                                    size: 'medium'
                                  }
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <div className="pay-button-container">
                        <input type="submit" onClick={buy}  className="pay-button" value="Pay"/>
                    </div>
                </form>
                     
                    <div className="purchase-info"> 
                    <h1>For Testing Payments:</h1>
                    <h2>Credit Card:</h2>
                    <ul>
                    <li>Card Number = 4111 1111 1111 1111</li>
                    <li>Expiration Date = 11/22</li>
                    <li>CVV = 123</li>
                    </ul>
                    <h2>Paypal:</h2>
                    <ul>
                    <li>Account Email = ecom-buyer@outlook.com</li>
                    <li>Password = 12345678</li>
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
        loading && <h1 className="loading">Loading...</h1>;
        
    return (
       
        <div className="checkout-info">
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
