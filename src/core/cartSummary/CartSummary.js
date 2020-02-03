import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkout from "../checkout/Checkout";
import { itemTotal, getCart } from '../cartHelpers';
import "./CartSummary.css"
import ShowImage from "../showImage/ShowImage";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);    

    const Card = ({ product }) => {
       
        return (
            <div className="product" tabIndex="0">
                <div className="product-container">
                <div className="product-header">{product.name}</div>
                    <ShowImage item={product} url="product" />
                    <p className="product-title">
                        {product.description.substring(0, 100)}
                    </p>
                    <p className="product-info">
                        ${product.price}</p>
                        Quantity: {product.count}
                </div>
            </div>
        );
    };

    const showItems = items => {
        return (
            <div>
                <h1>Total ${itemTotal()}</h1>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h1 className="emptyCartMessage-summary">
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h1>
    );

    return (
        <div>
        <div className="header">
            <a href="/" className="logo"><img src="/images/logo.png" alt="Logo"/></a>
        </div>
        <div className="cart-row-summary">
                <Checkout products={items} setRun={setRun} run={run} />
                <div className={items.length > 0 ? "items-container-summary": "no-Warning-summary"}>
                <div className="total-summary cart-layout-summary">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Cart;

