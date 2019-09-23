import React from "react";
import "./RadioBox.css"

//Allows user to choose only one of a predefined options

const RadioBox = ({ prices, handleFilters }) => {

    const handleChange = event => {
        handleFilters(event.target.value);
    };

    return prices.map((p, i) => (
        <li key={i}>
            <input
                aria-label="price tag"
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="shop-filters"
            />
            <label className="radio-box-name">{p.name}</label>
        </li>
    ));
};

export default RadioBox;