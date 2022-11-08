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
    <nav style={{background:"black", display:"flex", flexDirection:"column", position:"fixed", top:"0",zIndex:"999999"}}  className="p-3 navbar-dark shadow align-items-center w-100">
   
      <ul style={{display:"flex",borderRadius:"10px" ,listStyle:"none", position:"fixed", bottom:"0", background:"black"}} className="align-items-center navbar-dark shadow justify-content-center p-1">
        <li color="white" className="nav-item">
          <NavLink style={{color:"gray"}} exact to="/admin/dashboard" className="nav-link">
            Dashboard
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
        {/* <li className="nav-item">
          <NavLink style={{color:"gray"}} exact to="/admin/dashboard/posts" className="nav-link">
            All Posts
          </NavLink>
        </li> */}
      </ul>

      {isLoggedIn && (
        <div className="profile text-white font-weight-bold ">
          <NavLink style={{color:"gray", textAlign:"left"}} exact to="/home" >
            Home <br />
          </NavLink>
          Welcome Admin,{" "}
          <span className="text-warning">{user.displayName}</span>
          {/* <button className="btn btn-primary ml-3" onClick={() => logoutUser()}>
            Logout
          </button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
