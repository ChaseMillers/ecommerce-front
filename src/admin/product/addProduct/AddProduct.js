import React, { useState, useEffect } from "react";
import Layout from "../../../core/layout/Layout";
import { isAuthenticated } from "../../../auth";
import { Link } from "react-router-dom";
import HelpPopup from "./helpPopup"
import { createProduct, getCategories } from "../../apiAdmin";
import "./AddProduct.css"

const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        brief: "",
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
        formData: "",
        showHelp: false,
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        brief,
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
                    brief: "",
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

    const goBack = () => (
        <Link to="/admin/dashboard" className="back-to-dash">
            Back to Dashboard
        </Link>
    );

    const newPostForm = () => (
        <form className="newProductForm" onSubmit={clickSubmit}>
            <h1>Post Photo</h1>
    
            <HelpPopup values={values} setValues={setValues}/>
            
            <div >
                <label className="button-blue">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>
            <p>Recommend Web optimised, at least 1280 x 720.</p>

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
                <label className="product-text">Brief Description</label>
                <textarea
                    onChange={handleChange("brief")}
                    className="add-product-inputs"
                    value={brief}
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
            {goBack()}
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
            <h1>Product {createdProduct} was created!</h1>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="caution">
                <h1>Loading...</h1>
            </div>
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
            to="/admin/dashboard"
            >
            Dashboard 
          </Link>
          <div className="seperate">/</div> 
            Post Product
          </div>
        )

    return (
        <Layout
        routes={Routes()}
        imageClassName="no-banner-image"
        className="manage-products-container"
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