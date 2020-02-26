import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../../../auth";

const SignInAsGuest = () => {
    const [values, setValues] = useState({
        email: "guest@gmail.com",
        password: "123456",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

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

    const checkoutAsGuest = () => (
        <form className="guest-container">
            <button onClick={clickSubmit} className="button-blue">
            Checkout as Guest?
            </button>
            <button onClick={sendToSignIn} className="button-yellow">
            Already have an account?
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

    const sendToSignIn = () => {
        setValues({
            ...values,
            redirectToReferrer: true
        });
    }
        
    // is user admin?
    const redirectUser = () => {
        if (redirectToReferrer) {
            window.location.reload();
        }
    };

    return (
        <div>
            {showLoading()}
            {showError()}
            {checkoutAsGuest()}
            {redirectUser()}
        </div>
    );
};

export default SignInAsGuest;