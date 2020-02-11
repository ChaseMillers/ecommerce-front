export const addItem = (item, next) => {
    // the empty cart
    let cart = [];
    // get item from local storage
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        // increments the count everytime
        cart.push({
            ...item,
            count: 1
        });

        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart

        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

// allows user to remove item from cart
export const removeItem = productId => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.forEach((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
};

export const itemTotalCount = () => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
            return cart.reduce((currentValue, nextValue) => {
                return (
                currentValue + 
                nextValue.count * 1
                )
            },0)
        }
    }
};

export const itemTotal = () => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
            let itemCount = cart.reduce((currentValue, nextValue) => {
                return (
                currentValue + 
                nextValue.count * 
                nextValue.price
                )
            },0)
            // brings itemCount to money value
            return Number.parseFloat(itemCount).toFixed(2);
        }
    }
};

export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};

// adjusts price accordingly with quantity
export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.forEach((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const emptyCart = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
        next();
    }
};