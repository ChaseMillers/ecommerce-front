import React from "react";
import "./CategoryFilter.css"

const Checkbox = ({ categories, handleFilters }) => {

    const handleChange = event => {
        handleFilters(event.target.value);
    };

    const createCategories = ((c, i) =>(
        <select
        className="filter-select"
        onChange={handleChange}
        >
            <option value="">All</option>
            {categories.map((c, i) => (
                <option 
                key={i} 
                aria-label="category type"
                className="option-values" 
                value={`${c._id}`}>
                    {c.name}
                </option>
            ))}
        </select>
    ));

    return createCategories()
};

export default Checkbox;
