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
                <h4>Your cart has {`${items.length}`} items</h4>
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
        <h4>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h4>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="cart-container"
        >
            <div className="cart-row">
                <div className="cart-layout">
                    <h4 className="margin-bottom">Your cart summary</h4>
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
