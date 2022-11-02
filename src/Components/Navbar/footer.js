import React from "react";
import { Link, NavLink } from "react-router-dom";
import {FiHome} from "react-icons/fi"
import {FiBarChart} from "react-icons/fi"
import {FiShoppingCart} from "react-icons/fi"
import {FiBookOpen} from "react-icons/fi"


const Footer = () => {
  const navStyle = {
    position: "fixed",
    bottom: "0",
    width: "100%",
    background:"#202646",
    padding:"1rem 1.5rem",
    zIndex:"999",
    boxShadow:"0 3px 10px rgba(0,0,0,0.3)",
    paddingBottom:"0rem",
    borderTopRightRadius:"20px",
    borderTopLeftRadius:"20px"
  }
  const ul = {
    display:"flex",
    listStyle: "none",
    justifyContent:"space-between",
    marginBottom:"0px",
    

  }


  return (
    <nav className="navi" style={navStyle}>
    
      <input className="input-group" type="search" placeholder="Search...Jobs, Current Affairs, Results" />
      <ul style={ul}>
        <li >
          <NavLink exact to="/home">
            <FiHome id="ic" style={{background:"rgba(255,255,255,0.1)",borderRadius:"6px", padding:"5px"}} color="white" fontSize={27}/>
            <p style={{fontSize:"12px"}}>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/signal">
            <FiBarChart id="ic" style={{background:"rgba(255,255,255,0.1)",borderRadius:"6px", padding:"5px"}} color="white" fontSize={27}/>
            <p style={{fontSize:"12px"}}>Signals</p>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/tips">
        
            <FiBookOpen id="ic" style={{background:"rgba(255,255,255,0.1)",borderRadius:"6px", padding:"5px"}} color="white" fontSize={27}/>
            <p style={{fontSize:"12px"}}>Tips</p>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/shop">
        
            <FiShoppingCart id="ic" style={{background:"rgba(255,255,255,0.1)",borderRadius:"6px", padding:"5px"}} color="white" fontSize={27}/>
            <p style={{fontSize:"12px"}}>Shop</p>
          </NavLink>
        </li>
        
      </ul>
    </nav>
  );
};

export default Footer;
