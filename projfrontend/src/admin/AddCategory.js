import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  //for success and error msgs in the state and these are booleans
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructuring
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(false);
        setName("");
      }
    });
    // .catch(); we dont need catch

    setTimeout(() => {
      setSuccess(true);
    }, 2000);
  };

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="text-success">
          Category created successfully!
          <Redirect to="/admin/dashboard" />
        </h4>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead mt-4">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button className="btn  btn-outline-info rounded" onClick={onSubmit}>
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create Category"
      description="Add a new category for products"
      className="container p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
