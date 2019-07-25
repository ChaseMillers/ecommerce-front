const express = require('express')
const router = express.Router()

const { create, productById, read, remove, update } = require('../controllers/product') 
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth') 
const { userById } = require("../controllers/user"); 

router.get('/product/:productId', read)
// to create product you must be admin
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)

// anytime user id is in route as parameter, userNyId runs
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;