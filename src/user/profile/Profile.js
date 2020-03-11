import React, { useState, useEffect } from "react";
import Layout from "../../core/layout/Layout";
import { isAuthenticated } from "../../auth";
import { Redirect, Link } from "react-router-dom";
import { read, update, updateUser } from "../apiUser";
import './Profile.css'

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(
            data => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = () => {
        if (success) {
            return <Redirect to="/user/dashboard" />;
        }
    };

    const showError = () => (
        <div
            className="caution "
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-container">
                <label className="profile-update">Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    className="profile-inputs"
                    value={name}
                />
            </div>
            <div className="form-container">
                <label className="profile-update">Email</label>
                <input
                    type="email"
                    onChange={handleChange("email")}
                    className="profile-inputs"
                    value={email}
                />
            </div>
            <div className="form-container">
                <label className="profile-update">Password</label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    className="profile-inputs"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="button button-blue">
                Submit
            </button>
        </form>
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
        to="/user/dashboard"
        >
        Dashboard 
        </Link>
        <div className="seperate">/</div> 
        Profile Update 
      </div>
    )

    return (
        <Layout
            routes={Routes()}
            imageClassName="no-banner-image"
            className="main-container"
        >
            <h1 className="margin-bottom">Profile update</h1>
            {showError()}
            {profileUpdate(name, email, password)}
            {redirectUser()}
        </Layout>
    );
};

export default Profile;
