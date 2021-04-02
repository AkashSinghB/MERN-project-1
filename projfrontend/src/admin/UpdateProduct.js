import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import {
  getAllCategory,
  updateProduct,
  getProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateThisProduct = ({ match }) => {
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
    getaRedirect: false,
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

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          formData: new FormData(),
        });
        //console.log(categories);
        preloadCategories();
      }
    });
  };

  const preloadCategories = () => {
    getAllCategory().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
    console.log(match);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setValues({ ...values, error: false, loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
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
            getaRedirect: false,
            loading: false,
            success: true,
            createdProduct: data.name,
          });

          setTimeout(() => {
            setValues({ getaRedirect: true });
          }, 2000);
        }
      }
    );
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      error: false,
      [name]: value,
      success: false,
      getaRedirect: false,
    });
  };

  const successMessage = () => {
    if (getaRedirect) {
      return <Redirect to="/admin/products" />;
    }
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: success ? "" : "none" }}
      >
        <h4>{createdProduct} updated successfully</h4>
      </div>
    );
  };

  const [message, setMessage] = useState("");

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
        // eslint-disable-next-line no-sequences
        onClick={onSubmit}
      >
        Update Product
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

export default UpdateThisProduct;
