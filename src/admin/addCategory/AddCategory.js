import React, { useState } from "react";
import Layout from "../../core/layout/Layout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { createCategory } from "../apiAdmin";
import "./AddCategory.css"

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = e => {
        // resets error if there was one
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-container">
                <label className="product-text">Name</label>
                <input
                    type="text"
                    className="add-product-inputs"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="button-blue">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h1 className="text-success">Category {name} was created</h1>;
        }
    };

    const showError = () => {
        if (error) {
            return <h1 className="text-danger">Category name already exists</h1>;
        }
    };

    const goBack = () => (
            <Link to="/admin/dashboard" className="back-to-dash">
                Back to Dashboard
            </Link>
    );

    return (
        <Layout
            title="Add a new category"
            description={`G'day ${user.name}, ready to add a new category?`}
        >
            <div className="new-category-row">
                <div className="new-category-layout ">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;