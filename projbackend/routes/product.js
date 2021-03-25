const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator');

const { 
    getProductById, 
    createProducts, 
    getProduct, 
    photo, 
    deleteProduct, 
    updateProduct, 
    getAllProducts,
    getAllUniqueCategories
} = require('../controllers/product');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')

//all of params 
router.param("uId", getUserById)
router.param("productId", getProductById)

//all of actual routes
//create routes
router.post("/product/create/:uId",

//todo validation on the route level
isSignedIn, 
isAuthenticated, 
isAdmin, 
createProducts
);

//read routes
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

//delete routes
router.delete('/product/:productId/:uId', 
isSignedIn, 
isAuthenticated, 
isAdmin,
deleteProduct
);

//update routes
router.put("/product/:productId/:uId", 
isSignedIn, 
isAuthenticated, 
isAdmin,
updateProduct
);

//listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
