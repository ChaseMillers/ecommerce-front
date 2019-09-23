import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = ({ match }) => {
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
        error: false,
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
        redirectToProfile,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
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

        updateProduct(match.params.productId, user._id, token, formData).then(
            data => {
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
                        error: false,
                        redirectToProfile: true,
                        createdProduct: data.name
                    });
                }
            }
        );
    };

    const newPostForm = () => (
        <form className="margin-bottom" onSubmit={clickSubmit}>
            <h1>Post Photo</h1>
            <div className="update-product-container">
                <label className="button button-yellow">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>

            <div className="update-product-container">
                <label className="product-text">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="product-inputs"
                    value={name}
                />
            </div>

            <div className="update-product-container">
                <label className="product-text">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="product-inputs"
                    value={description}
                />
            </div>

            <div className="update-product-container">
                <label className="product-text">Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="product-inputs"
                    value={price}
                />
            </div>

            <div className="update-product-container">
                <label className="product-text">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="product-inputs"
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

            <div className="update-product-container">
                <label className="product-text">Shipping</label>
                <select
                    onChange={handleChange("shipping")}
                    className="product-inputs"
                >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="update-product-container">
                <label className="product-text">Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="product-inputs"
                    value={quantity}
                />
            </div>

            <button className="button button-blue">Update Product</button>
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
            <h1>{`${createdProduct}`} is updated!</h1>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="caution">
                <h1>Loading...</h1>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >
            <div className="row">
                <div className="filters-layout show-off">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
