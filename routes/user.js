const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth') 

const { userById } = require("../controllers/user"); 

// makes user id information available 
// isAuth makes it so other users can't access other users Ids, because Ids must match.
// isAdmin meens we must also be the Admin, role must be set to 1.
router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) =>{
    res.json({
        user: req.profile
    });
});

// If there is a userId in the route parameter, execute userById method
// makes user information available in the request object
router.param('userId', userById);

module.exports = router;