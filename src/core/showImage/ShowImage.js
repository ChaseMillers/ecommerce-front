import React from "react";
import { API } from "../../config";
import './ShowImage.css'

const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="img"
        />
    </div>
);

export default ShowImage;