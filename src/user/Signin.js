import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "demo@gmail.com",
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
        <form>
            <div className="sign-in">
                <label className="email-pass">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="sign-in">
                <label className="email-pass">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="button button-blue">
                Submit
            </button>
            <h2>How it works</h2>
       <div className="how-it-works-container">        
        <div className="how-it-works">
        <p>Create account, then sign in.</p>
        <img src="https://github.com/ChaseMillers/ecommerce-front/raw/master/pics/pic6.JPG" alt="Login Page"></img>
        <p>From Homepage you can view new arrivals and best sellers.</p>
        <img src="https://github.com/ChaseMillers/ecommerce-front/raw/master/pics/pic1.JPG" alt="Viewing community tab"></img>
        <p>From shop you can pic filters for going through products. </p>
        <img src="https://github.com/ChaseMillers/ecommerce-front/raw/master/pics/pic2.JPG" alt="adding someone to private chat"></img>
        <p>From the shopping cart you can checkout your order. Options for payment include credit card or Paypal. </p>
        <img src="https://github.com/ChaseMillers/ecommerce-front/raw/master/pics/pic3.JPG" alt="clicking name to start chat"></img>
        <p>From dashboard, User can view cart or update profile.</p>
        <img src="https://github.com/ChaseMillers/ecommerce-front/raw/master/pics/pic5.JPG" alt="chatting privately"></img>
        <p>From dashboard, admin has ability to add/delete/change products and view orders.</p>
        <img src="https://github.com/ChaseMillers/ecommerce-front/raw/master/pics/pic4.JPG" alt="chatting privately"></img>
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
                <h4>Loading...</h4>
            </div>
        );
        
            // is user admin?
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
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
            className="container"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;