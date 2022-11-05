import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";
import {FacebookShareButton, TelegramShareButton, WhatsappShareButton} from "react-share"
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
import $ from "jquery";
import { FaWhatsapp } from "react-icons/fa";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    
  }, []);





  return (
    <div className="container">
      <h5>Hello, {user == null ? "user" : user.displayName}</h5>
      <div className="head-row">
        <div>
          <WhatsappShareButton url="https://wa.me/+254719832751/">
            <FaWhatsapp
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "50%",
              }}
            />
          </WhatsappShareButton>
          <p>Whatsapp</p>
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
          <a href="#0">
            <FiStar
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "50%",
              }}
            />
          </a>
          <p>Rate</p>
        </div>
        <div className="telegram">
          <TelegramShareButton url="tg://join?invite=v8SGq97FkEk4YzRk/">
            <FiSend
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "50%",
              }}
            />
          </TelegramShareButton>
          <p>Telegram</p>
        </div>
        <div className="facebook">
          <FacebookShareButton url="https://www.facebook.com/profile.php?id=100087641640766">
            <FiFacebook
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "50%",
              }}
            />
          </FacebookShareButton>
          <p>Facebook</p>
        </div>

        <div className="youtube">
          <a href="https://youtube.com/channel/UCzfOnYvMTT3roPXZ7JfZpZA">
            <FiYoutube
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "50%",
              }}
            />
          </a>
          <p>Youtube</p>
        </div>
      </div>
      <div className="card box p-3">
        <p>
          <b>QuickFireTraders Admin</b>
        </p>
        <p>
          Welcome to Quick Fire Traders Trading signals. We bring you the best
          and most popular trading signals in th industry. Feel free to
          subscribe to our services any date directly in the app of contact us
          via our social platforms.
        </p>
      </div>
      <div className="d-flex" style={{ marginTop: "15px" }}>
        <WhatsappShareButton
          style={{textAlign:"left", marginRight: "15px" }}
          className="box w-50"
          url="https://wa.me/+254719832751/"
        >
          <div className="card p-3">
            <p>
              <b>Account Managers</b>
            </p>
            <FiUser
              style={{
                color: "#202646",
                fontSize: "40px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",
                marginBottom: "10px",
                borderRadius: "50%",
              }}
            />
            <p style={{ fontSize: "13px" }}>Brian Ongiri</p>
          </div>
        </WhatsappShareButton>
        <TelegramShareButton className=" w-50" url="tg://join?invite=v8SGq97FkEk4YzRk/">
          <div className="card box p-3">
            <p>
              <b>Chatroom</b>
            </p>
            <p>
              Join the public Telegram group to interact and share knowledge
              with others
            </p>
          </div>
        </TelegramShareButton>
      </div>
      
      <div className="card mt-3 p-3">
        <p>
          <b>Advert</b>
        </p>
        <div className="ads">
          <div style={{pointerEvents:"none"}} id="container-1261e9e73efbf5a14f0b266c74ab6ca4"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
