import React, { useState } from "react";
import "./RadioBox.css"

//graphical control element that allows the user to choose only one of a predefined options

const RadioBox = ({ prices, handleFilters }) => {
    const [setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <li className="list" key={i}>
            <input
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