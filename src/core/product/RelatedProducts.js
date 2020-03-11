import React from "react";
import Card from "../card/Card";
const RenderRelatedProduct = ({ relatedProduct }) =>{

  return (
    relatedProduct &&(
        <div className="related-products-layout">
                <h1>Related Products</h1>
                <div className="related-product-container">
                {relatedProduct.map((p, i) => (
                    <div key={i} className="related">
                        <Card 
                        key={i} 
                        product={p} 
                        storeCard={true}/>
                    </div>
                ))}
                </div>
                <br />
            </div>
        ) 
  )
}
    
export default RenderRelatedProduct


