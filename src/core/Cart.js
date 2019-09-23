import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";
import "./Cart.css"

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <h1>Your cart has {`${items.length}`} items</h1>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h1>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h1>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="cart-container"
        >
            <div className="cart-row">
                <div className="cart-layout">
                    <h1 className="margin-bottom">Your cart summary</h1>
                    <hr />
                    <Checkout products={items} />
                </div>
                <div className="total cart-layout">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
