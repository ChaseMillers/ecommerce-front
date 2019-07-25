const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

// Everything needed to create a product
const productSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength:32
        },
        description: {
            type: String,
            required: true,
            maxlength:2000
        },
        price:{
            type: Number,
            trim: true,
            required:true,
            maxlength:32
        },
        sold: {
            type: Number,
            default: 0
        },
        category:{
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        quantity: {
            type: Number
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        // some products might need shipping and some may not
        shipping: {
            required: false,
            type: Boolean
        }
    }, 
    {timestamps: true}
);


module.exports = mongoose.model("Product", productSchema);