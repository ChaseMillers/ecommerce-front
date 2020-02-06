import React from "react";
import "./PriceFilter.css"

const PriceFilter = ({ prices, handleFilters }) => {

    const handleChange = event => {
        handleFilters(event.target.value);
    };

    const createOptions = ((p, i) =>(
        <select
        className="filter-select"
        onChange={handleChange}
        >
            {prices.map((p, i) => (
                <option 
                key={i} 
                aria-label="price tag"
                className="option-values" 
                value={`${p._id}`}>
                    {p.name}
                </option>
            ))}
        </select>
    ));

    return createOptions()
};

export default PriceFilter;