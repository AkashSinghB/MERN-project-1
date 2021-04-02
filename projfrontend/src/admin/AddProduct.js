import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createProduct, getAllCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: "",
    formData: "",
    success: false,
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
    success,
  } = values;

  const preload = () => {
    return getAllCategory().then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        //console.log(categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setValues({ ...values, error: false, loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          error: "",
          photo: "",
          loading: false,
          success: true,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, error: false, [name]: value, success: false });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? message : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("none");
    }, 3000); //3 sec delay
    return () => clearTimeout(timer);
  }, [message]);

  const errorMessage = () => (
    <div
      id="hideError"
      className="alert alert-danger mt-3"
      style={{ display: error ? message : "none" }}
    >
      {console.log(message)}
      <h4>{error}</h4>
    </div>
  );

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success rounded">
          <input
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            onChange={handleChange("photo")}
          />
        </label>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={handleChange("description")}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          onChange={handleChange("price")}
        />
      </div>
      <div className="form-group">
        <select
          className="form-control"
          placeholder="Category"
          onChange={handleChange("category")}
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
          onChange={handleChange("stock")}
        />
      </div>

      <button
        className="btn btn-outline-success rounded"
        type="submit"
        onClick={onSubmit}
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add product here!"
      description="Welcome to product creation section"
      className="container p-4 "
    >
      <Link className="btn btn-info mb-3 btn-sm" to="/admin/dashboard">
        Admin Home
      </Link>
      <div className="row text-white rounded border">
        <div className="col-md-8 offset-md-2 mt-4 mb-4">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
