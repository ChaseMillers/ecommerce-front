import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import Card from "../card/Card";
import Checkout from "../checkout/Checkout";
import { itemTotal, getCart } from '../cartHelpers';
import "./Cart.css"

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);    

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
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h1 className="emptyCartMessage">
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h1>
    );

    return (
        <Layout className="cart-row"
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
        >
                <Checkout products={items} setRun={setRun} run={run} />
                <div className="items-container">
                <div className="total cart-layout">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;