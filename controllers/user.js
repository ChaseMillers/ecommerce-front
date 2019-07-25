const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id)
        // populate followers and following users array
        .populate("following", "_id name")
        .populate("followers", "_id name")
        // execute error or user
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            req.profile = user; // adds profile object in req with user info
            next();
        });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

/**
 * find user by Id, then set updated info in request body
 * new updated records will bve sent to front end in json response.
 */

exports.update = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.profile._id}, 
        {$set: req.body}, 
        {new: true},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: 'You are not authorized to do that'
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user);
        }
    );
}