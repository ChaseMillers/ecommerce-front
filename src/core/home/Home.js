import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { getProducts } from '../apiCore';
import Card from '../card/Card';
import Search from '../search/Search';
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

    const showNewProducts = () =>{
        if (productsByArrival.length >0)
        return(
            <div className="home-row">
            {productsBySell.map((product, i) => (
                <div key={i} className="home-layout ">
                    <Card product={product} />
                </div>
            ))}
        </div>
        )
        else{return(<h1 className="loading">Loading...</h1>)}
    }

    const showBestSellers = () =>{
        if (productsBySell.length >0)
        return(
            <div className="home-row">
            {productsByArrival.map((product, i) => (
                <div key={i} className="home-layout ">
                    <Card product={product} />
                </div>
            ))}
        </div>
        )
        else{return(<h1 className="loading">Loading...</h1>)}
    }

    return (
        <Layout
            title="E-commerce App"
            description="React Node MongoDB"
            className="home-container"
        >
        <Search />
        <h1 className="margin-bottom" tabIndex="0">New Arrivals</h1>
        {showNewProducts()}
        <h1 className="home-margin" tabIndex="0">Best Sellers</h1>
        {showBestSellers()}
        </Layout>
    );
};

export default Home;