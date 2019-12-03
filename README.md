## Server side to Ecommerce Website Template

## Live - https://ecommerce-template64.netlify.com/

## Summary 
The e-commerce website, designed as a template for anyone that wants to sell products. 
It was made to have all the basic features you would expect from an e-commerce website as well as features that let the admin add/delete and change products for the shopping page. It includes a purchase summary page for user and admin. The front end is deployed from Zeit and backend with Heroku.  

## Tools
 - MongoDB 
 - Node.js
 - Braintree – for implementing paypal and credit information
 - Heroku
 
## End points

.post('/api/signup')
.post('/api/signin')
.get('/api/signout') 

.get("/api/categories") - Lists all categorys.
.get("/api/category/:categoryId") - Gets info on specific category.
.post("/api/category/create/:userId") - Posts new category.
.delete("/api/category/:categoryId/:userId) - Deletes category.

.get("/api/prodcuts") - Lists all prodcuts
.get("/api/products/related/:productId"- Gets info on specific category.
.get("/api/products/categories") - Shows categorys related to products.
.get("/api/product/photo/:productId") - Gets product picture.
.get("/api/product/:productId") - Gets all product info.
.post("/api/product/create/:userId") - Posts product.
.put("/api/product/create/:userId") - Updates product. 
.delete("/api/product/:productId/:userId") - Deletes product.

.get("/order/list/:userId") - Reads list of orders from user.
.get("/order/status-values/:userId") - Reads order status.

.get("/api/user/:userId") - Shows user info.
.get("/api/orders/by/user/:userId") - Shows user purchase history. 
.put("/api/signin") - Updates user info. 
