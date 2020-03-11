import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkout from "../checkout/Checkout";
import { itemTotal, getCart } from '../cartHelpers';
import "./CartSummary.css"
import Card from "../card/Card"

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
                showStockIcon={false}
                showAddToCartButton={false}
                miniCard ={true}
                setRun={setRun}
                run={run}
                />
            ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <div className="thanks-container">
            <h1 className="emptyCartMessage-summary">
                Thanks For Your Purchase!
            </h1>
            <p>You will recieve an email shortly.</p>
            <h2 > <Link to="/shop">Continue shopping</Link></h2>
        </div>
    );

    return (
        <div>
        <div className="header">
            <a href="/" className="logo"><img src="/images/swash-caps.webp" alt="Logo"/></a>
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

