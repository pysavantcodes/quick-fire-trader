import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";
import {
  FiFacebook,
  FiYoutube,
  FiSend,
  FiStar,
  FiGlobe,
  FiDollarSign,
  FiHelpCircle,
  FiUser,
} from "react-icons/fi";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPosts())

  },[])

  return (
    <div className="container">
      <h5>Hello, {user == null ? "user" : user.displayName}</h5>
      <div className="head-row">
        <div className="help">
          <FiHelpCircle
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "50%",
            }}
          />
          <p>Help</p>
        </div>
        <div className="sub">
          <FiDollarSign
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "50%",
            }}
          />
          <p>Subscribe</p>
        </div>
        <div className="rate">
          <FiStar
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "50%",
            }}
          />
          <p>Rate</p>
        </div>
        <div className="telegram">
          <FiSend
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "50%",
            }}
          />
          <p>Telegram</p>
        </div>
        <div className="facebook">
          <FiFacebook
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "50%",
            }}
          />
          <p>Facebook</p>
        </div>
        <div className="team">
          <FiGlobe
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "50%",
            }}
          />
          <p>Team</p>
        </div>
        <div className="youtube">
          <FiYoutube
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "50%",
            }}
          />
          <p>Youtube</p>
        </div>
      </div>
      <div className="card box p-3">
        <p>
          <b>QuickFireTraders Admin</b>
        </p>
        <p>
          Welcome to Trading signals. We bring you the bes and most popular
          trading signals in th industry. Feel free to subscribe to our services
          any date directly in the app of contact us via our social platforms.
        </p>
      </div>
      <div className="d-flex" style={{marginTop:"15px"}}>
        <div className="card box p-3 w-50" style={{marginRight:"15px"}}>
          <p>
            <b>Account Managers</b>
          </p>
          <FiUser
            style={{
              color: "#202646",
              fontSize: "40px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",
              marginBottom:"5px",
              borderRadius: "50%",
            }}
          />
          <p style={{fontSize:"13px"}}>Admin name</p>
        </div>
        <div className="card box p-3 w-50">
          <p>
            <b>Chatroom</b>
          </p>
          <p>Join the public Telegram group to interact and share knowledge with others</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
