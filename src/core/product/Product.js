import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { read, listRelated } from "../apiCore";
import Card from "../card/Card";
import "./Product.css";

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [setError] = useState(false);

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

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    const showRelatedProducts = relatedProduct =>{
        return(
            relatedProduct && (
            <div className="related-products-layout">
                    <div className="related-product-container">
                    <h1>Related Products</h1>
                    {relatedProduct.map((p, i) => (
                        <div key={i} className="related">
                            <Card 
                            key={i} 
                            product={p} 
                            storeCard={true}/>
                        </div>
                    ))}
                    </div>
                </div>
            ) 
        )
    }

    return (
        <Layout
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
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
                
            {showRelatedProducts()}

            </div>
        </Layout>
    );
};

export default Product;