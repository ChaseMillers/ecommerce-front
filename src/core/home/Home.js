import React, { useState, useEffect, Suspense, lazy } from 'react';
import Layout from '../layout/Layout';
import { getProducts } from '../apiCore';
import Card from '../card/Card';
import "./Home.css"

const MyCarousel = lazy(() =>
    import("../home/Carousel")
);

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
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

    useEffect(() => {
        loadProductsBySell();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // top best seller products
    const showBestSellers = () =>{
        if (productsBySell.length >0)
        return(
            <div className="best-sellers-container">
                <h1 className="featured-products-title" tabIndex="0">Featured Products</h1>
                <div className="home-row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="card-layout ">
                        <Card 
                            product={product} 
                            storeCard={true}
                        />
                    </div>
                ))}
                </div>
        </div>
        )
        else{return(<h1 className="loading">Loading...</h1>)}
    }
    

    return (
        <Layout
            heroImage="https://i.imgur.com/BTK1oc9.jpg"
            link="product/5e5f1427cf5ed200247d1656"
            className="home-container"
        >
        {/* <Search /> */}
        {showBestSellers()}
        <Suspense fallback={<div></div>}>
        <MyCarousel />
        </Suspense>
        <div className="ad-container"></div>
        </Layout>
    );
};

export default Home;