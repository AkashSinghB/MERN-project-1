const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;

    next();
  });
};

exports.getAllCategory = (req, res) => {
  Category.find((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(cate);
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, cate) => {
    if (err) {
      return res.status(400).json(
        // error: "Not able to save category in DB",
        err
      );
    }
    res.json({
      category: cate,
    });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "fail to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      message: "Successfully deleted " + category.name + "category",
    });
  });
};
