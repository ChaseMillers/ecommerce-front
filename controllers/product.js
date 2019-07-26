const formidable = require('formidable');
const _ = require("lodash");
const fs = require("fs")
const Product = require('../models/product');
const {errorHandler} = require('../helpers/dbErrorHandler')

// find product
exports.productById = (req, res, next, id) =>{
    Product.findById(id).exec((err, product) =>{
        if(err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product
        next();
    })
};


exports.read = (req, res) =>{
    req.product.photo = undefined
    return res.json(req.product)
};

// creates product from form data because of image
// formidable lets us grab data from form
exports.create = (req, res) => {
    // makes form data avalibale 
    let form = new formidable.IncomingForm()
    // makes sure it holds onto the image or Extension 
    form.keepExtensions = true 
    form.parse(req, (err, fields, files) =>{
        if(err) {
            return res.status(400).json({
                error: 'image could not be uploaded'
            })
        }
        // check for all fields
        const {
            name, 
            description, 
            price, 
            category, 
            shipping
        } = fields

        if(
            !name || 
            !description ||
            !price || 
            !category || 
            !shipping
        ){
            return res.status(400).json({
                error: 'All feilds are required'
            });
        }



        let product = new Product(fields)
        // "photo" the data name sent from client
        // fs stands for file system
    
        // photo size convertion
        // 1kb = 1000
        // 1mb = 1000000
        if(files.photo) {
            //console.log("FILES PHOTO: ", files.photo)
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'image should be less than 1mb in size'
                });
            }
            // populates product photo and content type
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        // save product
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, delledProduct) =>{
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Product successfully deleted"
        })
    })
}

exports.update = (req, res) => {
    // makes form data avalibale 
    let form = new formidable.IncomingForm()
    // makes sure it holds onto the image or Extension 
    form.keepExtensions = true 
    form.parse(req, (err, fields, files) =>{
        if(err) {
            return res.status(400).json({
                error: 'image could not be uploaded'
            })
        }
        // check for all fields
        const {
            name, 
            description, 
            price, 
            category, 
            shipping
        } = fields

        if(
            !name || 
            !description ||
            !price || 
            !category || 
            !shipping
        ){
            return res.status(400).json({
                error: 'All feilds are required'
            });
        }



        let product = req.product
        product =_.extend(product, fields);


        // "photo" the data name sent from client
        // fs stands for file system
    
        // photo size convertion
        // 1kb = 1000
        // 1mb = 1000000
        if(files.photo) {
            //console.log("FILES PHOTO: ", files.photo)
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'image should be less than 1mb in size'
                });
            }
            // populates product photo and content type
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        // save product
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned 
 */

exports.list = (req, res) => {
    // defalut is ascending
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
    // all photos get saved in binary data
    // dont want photo because data will slow everything down
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err){
                return res.status(400).json({
                    error: 'Products not found'
                })
            }
            res.json(products)
        })
}

/**
 * it will find the products based on the req product category
 * other products that have the same category, will be returned
 */

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

// $ne means not encluded
// finds product based on category
    Product.find({_id: {$ne: req.product}, category: req.product.category})
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
        if (err){
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(products)
    })
}

exports.listCategories = ( req, res) => {
    // distinct is used with mongodb inorder to get all categories 
    Product.distinct("category", {}, (err, categories) => {
        if (err){
            return res.status(400).json({
                error: 'Category not found'
            })
        }
        res.json(categories)
    })
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

// works like a middleware 
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {}
    // assign search value to query.name
    if(req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'}
        // assign category value to query.category
        if(req.query.categorie && req.query.category !='All') {
            query.categorie = req.query.categorie
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(querry, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        }).select("-photo");
    }

}