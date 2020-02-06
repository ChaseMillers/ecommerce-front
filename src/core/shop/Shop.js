import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Card from "../card/Card";
import { getCategories, getFilteredProducts } from "../apiCore";
import CategoryFilter from "../filter/categoryFilter/CategoryFilter";
import PriceFilter from "../filter/priceFilter/PriceFilter";
import { prices } from "../fixedPrices";
import './Shop.css'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="button button-yellow margin-bottom">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilters = (filters, filterBy) => {
        
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    const showProducts = () =>{
        if (filteredResults.length >0)
        return(
            <div className="row-shop">
                     {filteredResults.map((product, i) => (
                        <div key={i} className="shop-layout">
                            <Card 
                            product={product} 
                            storeCard={true}
                            />
                        </div>
                    ))}
            </div>
        )
        else{return(<h1 className="loading">Loading...</h1>)}
    }

    return (
        <Layout
            title="Shop Page"
            description="Search and find items of your choice"
            className="shop-container"
        >
                    <div className="filter">
                    <fieldset className="filter-fieldset">
                        <legend>
                            <h1>Filter by type</h1>
                        </legend>
                            <CategoryFilter
                                categories={categories}
                                handleFilters={filters =>
                                    handleFilters(filters, "category")
                                }
                            />
                    </fieldset>
                    <fieldset className="filter-fieldset">
                        <legend>
                            <h1>Filter by price</h1>
                        </legend>    
                            <PriceFilter
                                prices={prices}
                                handleFilters={filters =>
                                    handleFilters(filters, "price")
                                }
                            />
                    </fieldset>
                    </div>
              
            <div className="row-shop">

                <div className="filters-layout">
                    <h1 className="margin-bottom">Products</h1>
                    {showProducts()}
                    {loadMoreButton()}
                </div>
                {error}
            </div>
        </Layout>
    );
};

export default Shop;