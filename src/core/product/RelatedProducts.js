import React, { useState, useEffect, Suspense, lazy  } from "react";
import Card from "../card/Card";
const RenderRelatedProduct = ({ relatedProduct }) =>{
    const [show, setShow] = useState(false)
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    relatedProduct && show &&(
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
    
export default RenderRelatedProduct


