import React from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const TopNav = () => {
  let navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className=" container container-fluid">
          <h4 className="" href="#">
            myNotebook
          </h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <div className="">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  {!localStorage.getItem("token") ? (
                    <div className="">
                      {" "}
                      <Link to="/login" className="btn">
                        Login
                      </Link>
                      <Link to="/signup" className="btn">
                        SignUp
                      </Link>
                    </div>
                  ) : (
                    <button className="logout-btn mx-1" onClick={handleLogOut}>
                      Logout
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNav;
