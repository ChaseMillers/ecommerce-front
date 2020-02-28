import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../../../core/layout/Layout";
import { signin, authenticate, isAuthenticated } from "../../../auth";
import {itemTotalCount} from '../../../core/cartHelpers';
import './Signin.css'

const Signin = () => {
    const [values, setValues] = useState({
        email: "testing@gmail.com",
        password: "123456",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <form className="signup-container">
            <div className="sign-in">
                <label className="email-pass">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-inputs"
                    value={email}
                />
            </div>

            <div className="sign-in">
                <label className="email-pass">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-inputs"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="button">
                Sign In
            </button>
            <h2>How it works</h2>
       <div className="how-it-works-container">        
        <div className="how-it-works">
            <ul>
                <li>Create account, then sign in, or used the autofilled demo account</li>
                <li>From the Homepage the user can view new arrivals and best sellers.</li>
                <li>From the shop page, a user can choose their filters when browsing products.</li>
                <li>From the shopping cart, the user can checkout their order.</li>
                <li>From the dashboard, the user can view cart or update profile.</li>
                <li>From the dashboard, the admin has ability to add/delete/change products and view orders.</li>
            </ul>
        </div>
      </div>
        </form>
    );

    const showError = () => (
        <div
            className="caution "
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="caution caution-text">
                <h1>Loading...</h1>
            </div>
        );
        
        //ROLES: admin = 1, user = 0, geust = 2
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            }
            else if (user && itemTotalCount() === 0 && user.role === 0){
                return <Redirect to="/user/dashboard" />;
            }
            else if (user && user.role === 2){
                return <Redirect to="/shop" />;
            }
             else {
                return <Redirect to="/" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;