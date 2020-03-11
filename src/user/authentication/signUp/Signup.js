import React, {useState} from 'react'
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom'
import Layout from '../../../core/layout/Layout'
import {signup} from '../../../auth'
import './Signup.css'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        redirectToReferrer: false
    })

    const { name, email, password, success, error, redirectToReferrer } = values

    // higher order function "a function returning another function"
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true,
                    redirectToReferrer: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-container">
                <label className="sign-in">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-inputs"
                    value={name}
                />
            </div>

            <div className="form-container">
                <label className="sign-in">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-inputs"
                    value={email}
                />
            </div>

            <div className="form-container">
                <label className="sign-in">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-inputs"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="button button-blue">
                Submit
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

    const showSuccess = () => (
        <div
            className="caution caution-text"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
                return <Redirect to="/signin" />;
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
    Create Account
  </div>
)

    return (
        <Layout
            routes={Routes()}
            imageClassName="no-banner-image"
            className="signup-container"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};



export default Signup;