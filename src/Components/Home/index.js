import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import fire from "../../config/fire";
import { db } from "../../config/fire";
import { doc, updateDoc } from "firebase/firestore";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";
import { RWebShare } from "react-web-share";
import {
  FiFacebook,
  FiYoutube,
  FiSend,
  FiStar,
  FiGlobe,
  FiDollarSign,
  FiHelpCircle,
  FiUser,
  FiBookOpen,
} from "react-icons/fi";
import $ from "jquery";
import { FaWhatsapp, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import TimeAgo from "javascript-time-ago";

const Home = () => {
  const [userObj, setUserObj] = useState({});
  const store = fire.firestore();
  const userCheck = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [docRef, setDocRef] = useState({});
  const [daysSpent, setDaysSpent] = useState(0);
  const [links, setLinks] = useState([
    {
      email: "quickfiretrader@gmail.com",
      facebook: "https://www.facebook.com/profile.php?id=100087641640766",
      telegram: "https://t.me/+v8SGq97FkEk4YzRk",
      whatsapp: "https://wa.me/+254768125852/",
      youtube: "https://youtube.com/channel/UCzfOnYvMTT3roPXZ7JfZpZA",
    },
  ]);

  useEffect(() => {
    dispatch(getPosts());
    if (userCheck == null) {
    } else {
      const fetchData = async () => {
        try {
          await store
            .collection("users")
            .doc(userCheck.email)
            .get()
            .then((snapshot) => {
              if (snapshot) {
                setDaysSpent(
                  Math.floor(
                    (Date.now() -
                      new Date(snapshot.data().planStart).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                );

                setUserObj(snapshot.data());
              }
            });
        } catch (err) {
          toast.error(err);
        }
      };

      fetchData();
    }
    const fetchLinks = async () => {
      try {
        await store
          .collection("links")
          .doc("izyQeo1ByOWQqz1kmpb8")
          .get()
          .then((snapshot) => {
            if (snapshot) {
              var data = [];
              data.push(snapshot.data());
              console.log(snapshot.data());
              setLinks(data);
            }
          });
      } catch (err) {
        toast.error(err);
      }
    };
    fetchLinks();

    const users = doc(db, "users", !userCheck ? "email" : userCheck.email);
    setDocRef(users);
  }, []);

  if (userObj.plan !== "free") {
    if (userObj.plan === "One Week") {
      if (daysSpent >= 7) {
        updateDoc(docRef, {
          plan: "free",
          planStart: Date.now(),
        });
      }
    }
    if (userObj.plan === "One Month") {
      if (daysSpent >= 30) {
        updateDoc(docRef, {
          plan: "free",
          planStart: Date.now(),
        });
      }
    }
    if (userObj.plan === "Three Months") {
      if (daysSpent >= 90) {
        updateDoc(docRef, {
          plan: "free",
          planStart: Date.now(),
        });
      }
    }
  }

  console.log(links);
  console.log(daysSpent);

  const oneWeek = () => {
    if (userObj.walletBalance > 972.8) {
      updateDoc(docRef, {
        walletBalance: Number(userObj.walletBalance) - 972.8,
        plan: "One Week",
        planStart: Date.now(),
      });
      return toast.success("One Week Plan Activated");
    } else {
      return toast.warning("Insufficient Balance");
    }
    // updateDoc(docRef,{
    //   walletBalance: Number(wallet) + response.amount,
    // })
  };
  const oneMonth = () => {
    if (userObj.walletBalance > 2432) {
      updateDoc(docRef, {
        walletBalance: Number(userObj.walletBalance) - 2432,
        plan: "One Month",
        planStart: Date.now(),
      });
      return toast.success("One Month Plan Activated");
    } else {
      return toast.warning("Insufficient Balance");
    }
  };
  const threeMonths = () => {
    if (userObj.walletBalance > 5107.2) {
      updateDoc(docRef, {
        walletBalance: Number(userObj.walletBalance) - 5107.2,
        plan: "Three Months",
        planStart: Date.now(),
      });
      return toast.success("Three Month Plan Activated");
    } else {
      return toast.warning("Insufficient Balance");
    }
  };
  const lifeTime = () => {
    if (userObj.walletBalance > 9606.4) {
      updateDoc(docRef, {
        walletBalance: Number(userObj.walletBalance) - 9606.4,
        plan: "Life Time",
        planStart: Date.now(),
      });
      return toast.success("LifeTime Plan Activated");
    } else {
      return toast.warning("Insufficient Balance");
    }
  };

  const share = () => {
    navigator.clipboard.writeText(
      "https://track.deriv.com/_aUlF11YKsMhBMfcXPt5VjGNd7ZgqdRLk/1/"
    );
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="container">
      <h5>Hello, {userCheck == null ? "user" : userCheck.displayName}</h5>
      <div className="head-row">
        <div>
          <a href={links !== null ? links[0].whatsapp : "#0"}>
            <FaWhatsapp
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "17px",
              }}
            />
          </a>
          <p>Whatsapp</p>
        </div>
        <div className="sub">
          <FiDollarSign
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "17px",
            }}
          />
          <p>Subscribe</p>
        </div>
        <div className="sub">
          <a href={links !== null ? links[0].telegram : "#0"}>
          <FiBookOpen
            style={{
              color: "#202646",
              fontSize: "50px",
              padding: ".7rem",
              background: "rgba(184, 184, 184, 0.7)",

              borderRadius: "17px",
            }}
          />
          </a>
          <p>Class</p>
        </div>
        <div className="rate">
          <a href="#0">
            <FiStar
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "17px",
              }}
            />
          </a>
          <p>Rate</p>
        </div>
        <div className="telegram">
          <a href={links !== null ? links[0].telegram : "#0"}>
            <FiSend
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "17px",
              }}
            />
          </a>
          <p>Telegram</p>
        </div>
        <div className="facebook">
          <a href={links !== null ? links[0].telegram : "#0"}>
            <FiFacebook
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "17px",
              }}
            />
          </a>
          <p>Facebook</p>
        </div>

        <div className="youtube">
          <a href={links !== null ? links[0].youtube : "#0"}>
            <FiYoutube
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",

                borderRadius: "17px",
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
        <a
          style={{ textAlign: "left", marginRight: "15px" }}
          className="box w-50"
          href={links !== null ? links[0].whatsapp : "#0"}
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
        </a>
        <a className=" w-50" href={links !== null ? links[0].telegram : "#0"}>
          <div className="card box p-3">
            <p>
              <b>Chatroom</b>
            </p>
            <p>
              Join the public Telegram group to interact and share knowledge
              with others
            </p>
          </div>
        </a>
      </div>

      <div className="card mt-3 p-3">
        <p>
          <b>Advert</b>
        </p>
        <div className="ads">
          <div
            style={{ pointerEvents: "none" }}
            id="container-1261e9e73efbf5a14f0b266c74ab6ca4"
          ></div>
        </div>
      </div>
      <div className="subscribe mt-3 card p-3">
        <p>
          <b>Subscribe</b>
        </p>
        <div className="btns">
          <div>
            <p>1 Week = 972.8 KES</p>
            <button
              onClick={() => oneWeek()}
              className="btn btn-primary"
              disabled={userObj.plan !== "free" ? true : false}
            >
              Subscribe
            </button>
          </div>
          <div>
            <p>1 Month = 2,432 KES</p>
            <button
              onClick={() => oneMonth()}
              className="btn btn-primary"
              disabled={userObj.plan !== "free" ? true : false}
            >
              Subscribe
            </button>
          </div>
          <div>
            <p>3 Month = 5107.20 KES</p>
            <button
              onClick={() => threeMonths()}
              className="btn btn-primary"
              disabled={userObj.plan !== "free" ? true : false}
            >
              Subscribe
            </button>
          </div>
          <div>
            <p>Lifetime = 9606.40 KES</p>
            <button
              onClick={() => lifeTime()}
              className="btn btn-danger"
              disabled={userObj.plan !== "free" ? true : false}
            >
              Subscribe
            </button>
          </div>
        </div>
        <p style={{ fontSize: "14px" }}>
          Trade spikes with the best spikes squad on Telegram. Note that this is
          only available to those with equity $50+
        </p>
        <div className="py-2 d-flex align-items-center justify-content-between">
          <p>
            <b>Spikes $10 Weekly</b>
          </p>
          <button className="btn btn-danger">Subscribe</button>
        </div>
      </div>
      <div className="broker mt-3 p-3 card">
        <p className="text-center">
          <b>Recommended Broker</b>
        </p>
        <p
          style={{ fontSize: "14px", fontWeight: "500" }}
          className="text-center"
        >
          Trade 24/7, Trade with Quick Fire Trader Today!
        </p>

        <div style={{ borderRadius: "7px" }} className="textonimg mt-3">
          <img
            className="w-100"
            src="https://www.uktech.news/wp-content/uploads/2022/02/shutterstock_1487940437.jpg"
            alt=""
          />
          <div className="bottom-left">
            <p>
              <a href="#0" onClick={() => share()} style={{ color: "white" }}>
                Join Now
              </a>
            </p>
          </div>
        </div>
        <p className="text-center mb-1 mt-3">
          <b>Support</b>
        </p>
        <p style={{ fontSize: "14px", fontWeight: "500" }}>
          Have an concern? Please contact us via Email or telegram below. Note
          that we will only respond to relevant questions, business queries or
          ideas.
        </p>
        <div
          style={{ textAlign: "center", marginTop: ".5rem" }}
          className="connect"
        >
          <a href={links !== null ? links[0].telegram : "#0"}>
            <FiSend
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",
                margin: ".7rem",
                borderRadius: "17px",
              }}
            />
          </a>
          <a href={links !== null ? `mailto: ${links[0].email}` : "#0"}>
            <FaGoogle
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",
                margin: ".7rem",
                borderRadius: "17px",
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
