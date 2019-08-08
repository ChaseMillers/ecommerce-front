import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="FullStack React Node MongoDB Ecommerce App"
            description="Node React E-commerce App"
            className="main-container"
        >
        <Search />
        <h4 className="mb-4">New Arrivals</h4>
        <div className="row">
            {productsByArrival.map((product, i) => (
                <div key={i} className="shop-layout ">
                    <Card product={product} />
                </div>
            ))}
        </div>

        <h4 className="mb-4">Best Sellers</h4>
        <div className="row">
            {productsBySell.map((product, i) => (
                <div key={i} className="shop-layout ">
                    <Card product={product} />
                </div>
            ))}
        </div>
        </Layout>
    );
};

export default Home;