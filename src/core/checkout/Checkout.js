import React, { useState, useEffect } from 'react';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from '../apiCore';
import { emptyCart, itemTotal } from '../cartHelpers';
import { isAuthenticated } from '../../auth';
import './Checkout.css';
import AddressForm from './checkoutHelpers/addressForm';
import SignInAsGuest from './checkoutHelpers/signInAsGuest';

import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    email: '',
    name: '',
    address: '',
    apt: '',
    city: '',
    zip: '',
    state: '',
    country: '',
  });

  let {
    email = data.email,
    name = data.name,
    address = data.address,
    apt = data.apt,
    city = data.city,
    zip = data.zip,
    state = data.state,
    country = data.country,
  } = data;

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

  const showCheckout = () => {
    return isAuthenticated() ? showDropIn() : <SignInAsGuest />;
  };

  const HandleSubmit = event => {
    event.preventDefault();
    event.persist();
    name &&
      address &&
      city &&
      zip &&
      state &&
      email &&
      data.instance &&
      data.clientToken &&
      products &&
      buy();
  };

  const buy = () => {
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    data.instance
      .requestPaymentMethod()
      .then(data => {
        // console.log(data);
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
          amount: itemTotal(products),
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
              address: address,
              apt: apt,
              city: city,
              zip: zip,
              state: state,
              country: country,
            };

            createOrder(userId, token, createOrderData)
              .then(response => {
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  setData({
                    loading: false,
                    success: true,
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
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onClick={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <form onSubmit={HandleSubmit}>
          <AddressForm setData={setData} data={data} />
          {pleaseSellect(data.error)}
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: 'vault',
                  displayName: 'e-commerce',
                  buttonStyle: {
                    size: 'medium',
                  },
                },
              }}
              onInstance={instance => (data.instance = instance)}
            />
       
          <div className="pay-button-container">
            <input type="submit" className="pay-button" value="Pay" />
          </div>
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
        </form>
      ) : null}
    </div>
  );

  const showError = error => (
    <div className="caution " style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const pleaseSellect = error => (
    <div className="caution error" style={{ display: error ? '' : 'none' }}>
      ↓ Please Sellect A Payment Method
    </div>
  );

  const showSuccess = success => (
    success && <div className="caution">
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = loading =>
    loading && <h1 className="loading">Loading...</h1>;

  return (
    <div className={products.length > 0 ? 'checkout-info' : 'none'}>
      {showSuccess(data.success)}
      <div className="cart-layout-summary">
        {showLoading(data.loading)}
        {showError(data.error)}
        {showCheckout()}
      </div>
    </div>
  );
};

export default Checkout;
