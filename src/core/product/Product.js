import React, { useState, useEffect, Suspense, lazy  } from "react";
import Layout from "../layout/Layout";
import { Link } from 'react-router-dom';
import Card from "../card/Card";
import "./Product.css";
import { read, listRelated } from "../apiCore";
const RenderRelatedProduct = lazy(() =>
    import('./RelatedProducts')
);

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [setError] = useState(false);
 
    useEffect(() => {
        const productId = props.match.params.productId;
        window.scrollTo(0, 0)
        loadSingleProduct(productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    const Routes = () =>(
        <div className="routes-container">
        <Link
        className="route-link"
        to="/"
        >
        HOME 
      </Link>
        <div className="seperate">/</div> 
        <Link
        className="route-link"
        to="/shop"
        >
        Shop 
      </Link>
      <div className="seperate">/</div> 
        Product
      </div>
    )

    return (
        <Layout
            routes={Routes()}
            imageClassName="no-banner-image"
            className="product-container"
        >
                <div className="row-view-product ">
                    <div className="view-product-layout">
                        {product && product.description && (
                            <Card 
                            product={product}
                            showStockIcon={false}
                            showViewProductButton={false} 
                            viewCard={true}
                            />
                        )}
                    </div>
                    <hr />
                <Suspense fallback={<div></div>}>
                    <RenderRelatedProduct relatedProduct={relatedProduct} />
                </Suspense>
                </div>
        </Layout>
    );
};

export default Product;