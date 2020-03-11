import React, { useState, useEffect } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { useMediaQuery } from 'react-responsive'
import { getProducts } from '../apiCore';
import Card from "../card/Card"

const MyCarousel = () => {

    const tablet = useMediaQuery({
        query: '(max-width:  876px)'
    })
    const phone = useMediaQuery({
        query: '(max-width:  576px)'
    })
    const desktop = useMediaQuery({
        query: '(min-width:  876px)'
    })
    useEffect(() => {
        loadProductsByArrival();
        loadMediaQuery();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tablet, phone, desktop]);

    const [productsByArrival, setProductsByArrival] = useState([]);
    const [setError] = useState(false);
    const [count, setCount] = useState(4);

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    const loadMediaQuery = () =>{
        if (tablet)
            setCount(3)
        if (phone)
            setCount(2)
        if (desktop)
            setCount(4)
    }

    return (
        <div>
            <h1 className="new-best-margin" tabIndex="0">New Arrivals</h1>
            <Carousel
            slidesPerPage={count}
            arrowLeft={<div className="buttons left" name="arrow-left"/>}
            arrowRight={<div className="buttons right" name="arrow-right"/>}
            addArrowClickHandler
            >
                {productsByArrival.map((product, i) => (
                            <div key={i} className="home-layout ">
                                <Card 
                                    product={product} 
                                    storeCard={true}
                                />
                            </div>
                        ))}
            </Carousel>
      </div>
    );
}

export default MyCarousel
