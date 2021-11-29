import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container my-5">
      <div className="card mx-auto border-0">
        <div className="row justify-content-center p-3">
          <div className="col-md-6 my-auto">
            <h1 className="display-4 fw-bold text-center">
              Oops!! 404 Page Not Found
            </h1>
            <Link to="/" className="lead d-block fw-bold text-center">
              {" "}
              Back to home
            </Link>
          </div>
          <div className="col-md-6">
            <img
              className="img-fluid"
              src="https://www.gozayaan.com/img/image-error-data.8c49ccd1.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
