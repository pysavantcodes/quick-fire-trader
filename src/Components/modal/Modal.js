import React from "react";
import { FiUser } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";
import { FaGoogle, FaWhatsapp } from "react-icons/fa";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import fire from "../../config/fire";
import GooglePayButton from "@google-pay/button-react";

const Modal = ({ show, name, email, wallet }) => {
  window.onclick = (e) => {
    if (e.path[0].className === "modal-bg") {
      document.querySelector(".modal-bg").style.display = "none";
      show();
    }
  };

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "RESET_USER" });
        toast.success("You are successfully logged out");
        history.push("/auth/login");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="modal-bg">
      <div className="mod">
        <div className="head">
          <div className="info">
            <div className="img">
              <FiUser />
            </div>
            <div className="txt">
              <p style={{ fontSize: "15px", fontWeight: "500" }}>
                Hello, {name}
              </p>
              <p style={{ fontSize: "14px" }}>{email}</p>
            </div>
          </div>
          <div className="wallet">
            My wallet <br /> ${wallet}
          </div>
        </div>
        <h4>
          Support app development and maintenance by donating, Thank you for
          your anticipation.
        </h4>
        <div className="donate">
          <p>$2</p>
          <button className="btn btn-black w-100">Donate</button>
        </div>
        <button className="btn btn-primary mb-2 w-100">
          &#x1F4B8; Fund Account
        </button>
        <button
          style={{ columnGap: "10px" }}
          className="btn btn-primary d-flex mx-auto justify-content-between align-items-center my-2"
        >
          <p>Share App</p>
          <i className="fa fa-share"></i>
        </button>
        <div className="connect">
          <p>Connect to us Via</p>
          <div className="mb-1">
            <a href="https://www.facebook.com/profile.php?id=100087641640766">
              <FiFacebook id="ic"
                style={{
                  color: "#202646",
                  fontSize: "45px",
                  padding: ".7rem",
                  background: "rgba(184, 184, 184, 0.7)",
                  margin: ".7rem",
                  borderRadius: "50%",
                }}
              />
            </a>
            <a href="https://t.me/+v8SGq97FkEk4YzRk">
              <FiSend id="ic"
                style={{
                  color: "#202646",
                  fontSize: "45px",
                  padding: ".7rem",
                  background: "rgba(184, 184, 184, 0.7)",
                  margin: ".7rem",
                  borderRadius: "50%",
                }}
              />
            </a>
            <a href="https://youtube.com/channel/UCzfOnYvMTT3roPXZ7JfZpZA">
              <FiYoutube id="ic"
                style={{
                  color: "#202646",
                  fontSize: "45px",
                  padding: ".7rem",
                  background: "rgba(184, 184, 184, 0.7)",
                  margin: ".7rem",
                  borderRadius: "50%",
                }}
              />
            </a>
            <a href="https://quickfiretraders@gmail.com">
              <FaGoogle id="ic"
                style={{
                  color: "#202646",
                  fontSize: "45px",
                  padding: ".7rem",
                  background: "rgba(184, 184, 184, 0.7)",
                  margin: ".7rem",
                  borderRadius: "50%",
                }}
              />
            </a>
            <a href="https://wa.me/+254719832751/">
              <FaWhatsapp id="ic"
                style={{
                  color: "#202646",
                  fontSize: "45px",
                  padding: ".7rem",
                  background: "rgba(184, 184, 184, 0.7)",
                  margin: ".7rem",
                  borderRadius: "50%",
                }}
              />
            </a>
          </div>
        </div>
        <button onClick={() => logoutUser()} className="btn btn-primary w-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Modal;
