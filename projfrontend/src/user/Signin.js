import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input className="form-control" type="email" />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" />
            </div>
            <br />
            <button className="btn btn-success btn-block">Sign in</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign in to Store" description="">
      {signInForm()}
    </Base>
  );
};

export default Signin;
