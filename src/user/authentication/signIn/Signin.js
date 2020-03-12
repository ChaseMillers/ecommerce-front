import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../../../core/layout/Layout";
import { signin, authenticate, isAuthenticated } from "../../../auth";
import {itemTotalCount} from '../../../core/cartHelpers';
import './Signin.css'
import { Link } from 'react-router-dom';

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
            <button onClick={clickSubmit} className="button button-blue">
                Sign In
            </button>
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

    const Routes = () =>(
        <div className="routes-container">
        <Link
        className="route-link"
        to="/"
        >
        HOME 
      </Link>
      <div className="seperate">/</div> 
        Login
      </div>
    )

    return (
        <Layout
            routes={Routes()}
            imageClassName="no-banner-image"
            className="signup-container"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;