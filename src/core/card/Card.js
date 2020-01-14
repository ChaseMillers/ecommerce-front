import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShowImage from "../showImage/ShowImage";
// moment removes the need to use the native JavaScript Date object directly
//import moment from "moment";
import { addItem, updateItem, removeItem } from "../cartHelpers";
import "./Card.css"
import Cart from "../cartPopup/CartPopup"

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined,
}) => {
    const [count, setCount] = useState(product.count);

    const {
        toggleCart,
    } = Cart()

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                        className="button-yellow"
                >
                    Remove Product
                </button>
            )
        );
    };

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="button-blue">
                        View Product
                </Link>
            )
        );
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button
                    onClick={() =>{
                        addItem(product, () => {
                            toggleCart()
                            setRun(!run);
                        });
                    }}
                    className="button-yellow"
                >
                    Add to cart 
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="in-stock">In Stock</span>
        ) : (
            <span className="in-stock ">Out of Stock</span>
        );
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="update-options-container">
                        <div className="update-options">
                            <span className="update-options-text">
                                Quantity
                            </span>
                        </div>
                        <input
                            aria-label="Product quantity"
                            type="number"
                            className="card-form-inputs"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };

    return (
        <div>
        <div className="product" tabIndex="0">
            <div className="product-header">{product.name}</div>
            <div className="product-container">
                <ShowImage item={product} url="product" />
                <p className="product-title">
                    {product.description.substring(0, 100)}
                </p>
                <p className="product-info">${product.price}</p>
                {/* 
                To also display category and date added, uncomment
                
                <p className="product-info">
                    Category: {product.category && product.category.name}
                </p>
                <p className="product-info">
                    Added on {moment(product.createdAt).fromNow()}
                </p> */}

                {showStock(product.quantity)}

                <div className="button-holder">
                {showViewButton(showViewProductButton)}

                {showAddToCart(showAddToCartButton)}
                
                {showRemoveButton(showRemoveProductButton)}
                </div>
                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
        </div>
    );
};

export default Card;