import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import './Search.css'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return( 
            <h1>Found {results.length} products</h1>
            )
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <div className="margin-bottom">
                    {searchMessage(searched, results)}
                </div>

                <div className="row">
                    {results.map((product, i) => (
                        <div className="search-layout">
                            <Card key={i} product={product} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-data-text">
            <div
                    className="input-data-append"
                    style={{ border: "none" }}
                >
                    <button className="search-button">Search</button>
                </div>
                <div className="input-data">
                    <input
                        type="search"
                        className="search-bar"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                        aria-label="Search Bar"
                    />
                     <div className="input-button">
                        <select
                            className="select"
                            onChange={handleChange("category")}
                            aria-label="Select product type"
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option className="option-values" key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container">{searchForm()}</div>
            <div className="search-container">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;