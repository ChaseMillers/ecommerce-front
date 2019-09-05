import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import "./Home.css"

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [setError] = useState(false);

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
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout
            title="E-commerce App"
            description="React Node MongoDB"
            className="home-container"
        >
        <Search />
        <h4 className="margin-bottom">New Arrivals</h4>
        <div className="home-row">
            {productsByArrival.map((product, i) => (
                <div key={i} className="home-layout ">
                    <Card product={product} />
                </div>
            ))}
        </div>

        <h4 className="home-margin">Best Sellers</h4>
        <div className="home-row">
            {productsBySell.map((product, i) => (
                <div key={i} className="home-layout ">
                    <Card product={product} />
                </div>
            ))}
        </div>
        </Layout>
    );
};

export default Home;