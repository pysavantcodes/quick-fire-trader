import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ logoutUser }) => {
  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  return (
    <nav style={{background:"black", display:"flex", flexDirection:"column"}}  className="p-3 navbar-dark shadow align-items-center justify-content-center">
      <Link to="/admin/dashboard/" className="navbar-brand">
        Admin Dashboard
      </Link>
      <ul style={{display:"flex", listStyle:"none"}} className="align-items-center justify-content-center">
        <li color="white" className="nav-item">
          <NavLink style={{color:"gray"}} exact to="/admin/dashboard" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink style={{color:"gray"}} exact to="/admin/dashboard/addPost" className="nav-link">
            Add Post
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink style={{color:"gray"}} exact to="/admin/dashboard/addSignal" className="nav-link">
            Add Signal
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink style={{color:"gray"}} exact to="/admin/dashboard/posts" className="nav-link">
            All Posts
          </NavLink>
        </li>
      </ul>

      {isLoggedIn && (
        <div className="profile text-white font-weight-bold ">
          Welcome Admin,{" "}
          <span className="text-warning">{user.displayName}</span>
          <button className="btn btn-primary ml-3" onClick={() => logoutUser()}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
