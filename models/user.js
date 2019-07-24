const mongoose = require('mongoose')
const crypto = require ('crypto')
const uuidv1 = require ("uuid/v1")

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength:32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique:32
        },
        hashed_password: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            trim: true,
        },
        salt: String,
        // when user sighn in they get default role of 0
        role: {
            type: Number,
            default: 0
        },
        // store shop history
        history: {
            type: Array,
            default: []
        },
    }, 
    {timestamps: true}
);

/**
 * Virtual fields are additional fields for a given model.
 * Their values can be set manually or automatically with defined functionality.
 * Keep in mind: virtual properties (password) don’t get persisted in the database.
 * They only exist logically and are not written to the document’s collection.
 */

// virtual feild
userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function () {
    return this._password
})

// methods, passwords have to match to authenticate the user
userSchema.methods ={
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

// find documentation in node.js for crypto to see example
    encryptPassword: function(password) {
        if(!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex')
        } catch (err) {
            return "";
        }
    }
}
// This User model is used in are controller 
module.exports = mongoose.model("User", userSchema);