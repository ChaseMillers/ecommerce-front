import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";
import "./AddProduct.css"

const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        quantity,
        loading,
        error,
        createdProduct,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="margin-bottom" onSubmit={clickSubmit}>
            <h1>Post Photo</h1>
            <div className="add-product-container">
                <label className="button button-blue">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>

            <div className="add-product-container">
                <label className="product-text">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="add-product-inputs"
                    value={name}
                />
            </div>

            <div className="add-product-container">
                <label className="product-text">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="add-product-inputs"
                    value={description}
                />
            </div>

            <div className="add-product-container">
                <label className="product-text">Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="add-product-inputs"
                    value={price}
                />
            </div>

            <div className="add-product-container">
                <label className="product-text">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="add-product-inputs"
                >
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="add-product-container">
                <label className="product-text">Shipping</label>
                <select
                    onChange={handleChange("shipping")}
                    className="add-product-inputs"
                >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="add-product-container">
                <label className="product-text">Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="add-product-inputs"
                    value={quantity}
                />
            </div>

            <button className="button button-blue">Create Product</button>
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
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h1>{`${createdProduct}`} is created!</h1>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="caution">
                <h1>Loading...</h1>
            </div>
        );

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >
            <div className="new-category-row">
                <div className="new-category-layout ">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;