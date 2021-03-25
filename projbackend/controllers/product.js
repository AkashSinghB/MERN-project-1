const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); //file system
const { sortBy } = require("lodash");
// const { check, validationResult } = require('express-validator');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProducts = (req, res) => {

  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //   return res.status(422).json({
  //     errors: 
  //     {message:errors.array()[0].msg,
  //       param:errors.array()[0].param
  //     }
  //   });
  // }

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields    ex- fields.price
    const {name, description, price, category, stock} = fields;

    //TODO: restrictions on fields on route level
    if(!name || !description || !price ||!category || !stock){
      return res.status(400).json({
        error: "Please include all fields"
      });
    } 

    
    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size to big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //console.log(product)
    
    //save to the DB
    product.save((err, product) => {
      if (err) {
        return status(400).json({
          error: "Saving tshirt in DB failed",
        });
      }
      res.json(product);
    });
  });
};


exports.getProduct = (req,res) => {
  req.product.photo = undefined
  return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {

  //safty net check (if there is some data then only we return some data)
  if(req.product.photo.data){
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//delete controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if(err){
      return res.status(400).json({
        error: "Failed to delete the product"
      })
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct
    });
  });
};

//update controllers
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
   
    //updation code
    let product = req.product;
    product = _.extend(product, fields)

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size to big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //console.log(product)
    
    //save to the DB
    product.save((err, product) => {
      if (err) {
        return status(400).json({
          error: "Updation on product failed",
        });
      }
      res.json(product);
    });
  });
};


//product listing

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

  Product.find()
  .select("-photo")   // "-" is for dont select photo
  .populate("category")
  .sort([[sortBy, "asc"]])
  .limit(limit)
  .exec((err, products) => {
    if(err){
      return res.status(400).json({
        error: "No products right now"
      })
    }
    res.json(products);
  });
};


exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if(err){
      return res.status(400).json({
        error: "No category found"
      })
    }
    res.json(category);
  });
};

//changing stocks on the basis of solds
exports.updateStock = (req, res, next) => {

  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: {_id: prod._id},
        update: {$inc: {stock:-prod.count, sold: +prod.count}}
      }
    }
  }); 

  Product.bulkWrite(myOperations, {}, (err,products) => {
    if(err){
      return res.status(400).json({
        error: 'Bulk operations failed'
      })
    }
    next();
  });
};