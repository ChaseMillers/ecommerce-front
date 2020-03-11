import React, { useState, useEffect } from "react";
import Layout from "../../../core/layout/Layout";
import { isAuthenticated } from "../../../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../apiAdmin";
import "./ManageProducts.css";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    const goBack = () => (
        <Link to="/admin/dashboard" className="back-to-dash">
            Back to Dashboard
        </Link>
    );

    useEffect(() => {
        loadProducts();
    }, []);

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
        Manage Products
      </div>
    )

    return (
        <Layout
            routes={Routes()}
            imageClassName="no-banner-image"
            className="manage-products-container"
        >
            <div className="manage-products-row">
                <div className="manage-products-layout">
                    <h1 className="total-products">
                        Total {products.length} products
                    </h1>
                    {goBack()}
                    <ul className="manage-product-list">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="manage-products"
                            >
                                <strong className="manage-product-name">{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="button-blue">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="button-yellow"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
