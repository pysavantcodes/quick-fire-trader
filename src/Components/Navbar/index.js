import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import Modal from "../modal/Modal";
import fire from "../../config/fire";
import GooglePayButton from "@google-pay/button-react"

const Navbar = () => {
  const [userObj, setUserObj] = useState({});

  const db = fire.firestore();

  const userCheck = useSelector((state) => state.auth.user);



  const fetchInfo = ()=>{
    if(userCheck == null){

    }else{
      db.collection("users")
      .doc(userCheck.email)
      .get()
      .then((snapshot) => {
        if (snapshot) {
          setUserObj(snapshot.data())
        }
      });
    }
  }
  

  const [showModal, setShowModal] = useState(false);
  const show = () => {
    setShowModal(false);
  };

  

  const navStyle = {
    position: "fixed",
    top: "0",
    width: "100%",

    padding: ".6rem",
    zIndex: "1",
  };
  const newStyle = {
    width: "100%",
    background: "#202646",
    padding: "1rem",
    boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
    borderRadius: "10px",
  };
  const top = {
    display: "flex",
    alignItems: "center",
  };
  const user = {
    background: "white",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    marginRight: "10px",
  };

  

  return (
    <nav className="navi" style={navStyle}>
      {showModal ? (
        <Modal
          name={!userCheck ? "User name" : userCheck.displayName}
          email={!userCheck ? "User email" : userCheck.email}
          show={() => show()}
          wallet={!userObj.walletBalance ? "0" : userObj.walletBalance.toFixed(2)}
          plan={!userObj ? "0" : userObj.plan}
          fetchInfo={()=>fetchInfo()}
        />
      ) : null}
      <div style={newStyle}>
        <div style={top}>
          <div onClick={() => setShowModal(true)} style={user}>
            <FiUser />
          </div>
          <h1 style={{ fontSize: "15px", color: "white", margin: "0" }}>
            Quick Fire Traders
          </h1>
        </div>
        <input
          className="input-group"
          type="search"
          placeholder="Search...Jobs, Current Affairs, Results"
        />
      </div>
    </nav>
  );
};

export default Navbar;
