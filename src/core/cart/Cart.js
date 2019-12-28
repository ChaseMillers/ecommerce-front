import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import Card from "../card/Card";
import Checkout from "../checkout/Checkout";
import Countries from "../checkout/Countries";
import { itemTotal, getCart } from '../cartHelpers';
import "./Cart.css"

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [items]);    

    const showItems = items => {
        return (
            <div>
                <h1>Total ${itemTotal()}</h1>
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
        >
            <div className="cart-row">
                <div className="address-container">
                    <div className="cart-layout grey">
                        <div className="long-address-bar block">
                        <h1 className="cart-headers">Shipping Address</h1>
                        <hr />
                        </div>
                        <Checkout products={items} />
                    </div>
                </div>
                <div className="items-container">
                    <div className="total cart-layout">
                        {items.length > 0 ? showItems(items) : noItemsMessage()}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
