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
