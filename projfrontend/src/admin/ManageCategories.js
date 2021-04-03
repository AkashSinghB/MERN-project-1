import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
  getAllCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./helper/adminapicall";
import Base from "../core/Base";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const [catName, setCatName] = useState({ name: "" });

  const { name } = catName;

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategory().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const removeCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const onUpdate = (categoryId) => {
    updateCategory(categoryId, user._id, token, name).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCatName({ name: "" });
        setShow("");

        preload();
      }
    });
  };

  const updateCancel = (e) => {
    setShow("");
  };

  const [show, setShow] = useState(false);

  const toggleEdit = (id, categoryId) => {
    setShow(id);

    //read category by category id
    getCategory(categoryId).then((data) => {
      if (data.error) {
      } else {
        setCatName({ name: data.name });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setCatName({ name: e.target.value });
  };

  const createCategoryList = () => (
    <div className="row">
      <div className="col-12">
        <h2 className="text-center text-white my-3">
          Total {categories.length} categories
        </h2>

        {categories.map((category, index) => (
          <div key={index} className="row text-center mb-2">
            <div className="col-4">
              <h3
                className="text-white text-left"
                style={{ display: show === index ? "none" : "" }}
              >
                {category.name}
              </h3>
              <input
                type="text"
                name="category"
                className="form-control"
                style={{ display: show === index ? "" : "none" }}
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="col-4">
              <button
                className="btn btn-success rounded"
                style={{ display: show === index ? "none" : "" }}
                onClick={() => toggleEdit(index, category._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-success rounded"
                style={{ display: show === index ? "" : "none" }}
                onClick={() => {
                  onUpdate(category._id);
                }}
              >
                Update
              </button>
              <button
                className="btn btn-danger rounded ml-2"
                style={{ display: show === index ? "" : "none" }}
                onClick={updateCancel}
              >
                Cancel
              </button>
            </div>
            <div className="col-4">
              <button
                className="btn btn-danger rounded"
                onClick={() => {
                  removeCategory(category._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Base title="Welcome Admin" description="Manage categories here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span>Admin Home</span>
      </Link>
      <h2 className="mb-4">All categories:</h2>
      {createCategoryList()}
    </Base>
  );
};

export default ManageCategories;
