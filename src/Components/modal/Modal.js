import React from "react";
import { FiUser } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";
import { FaGoogle, FaWhatsapp } from "react-icons/fa";
import { NavLink, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import fire, { db } from "../../config/fire";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useState , useEffect} from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const Modal = ({ show, name, email, wallet, fetchInfo, plan }) => {
  window.onclick = (e) => {
    fetchInfo()
    if (e.path[0].className === "modal-bg") {
      document.querySelector(".modal-bg").style.display = "none";
      show();
    }
  };

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

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const store = fire.firestore();
  const history = useHistory();

  /**states */
  const [fundAmount, setFundAmount] = useState("");
  const [docRef, setDocRef] = useState({});
  const [currency, setCurrency] = useState("KES");
  const [userObj, setUserObj] = useState({});
  const [daysSpent, setDaysSpent] = useState(0)
  const [links, setLinks] = useState([
    {
      email: "quickfiretrader@gmail.com",
      facebook: "https://www.facebook.com/profile.php?id=100087641640766",
      telegram: "https://t.me/+v8SGq97FkEk4YzRk",
      whatsapp: "https://wa.me/+254768125852/",
      youtube: "https://youtube.com/channel/UCzfOnYvMTT3roPXZ7JfZpZA",
    },
  ]);

  /**Currencies */
  // const currencies = ["KES","CAD","XAF","CLP","COP","EGP","EUR","GHS","GNF","GBP","MWK","MAD","NGN","RWF","SLL","STD","ZAR","TZS","UGX","USD","XOF","ZMW"]
  const currencies = ["KES","NGN"]

  const userCheck = useSelector((state) => state.auth.user);

  useEffect(() => {
    
    const users = doc(db, "users", email);
    setDocRef(users)
    fetchInfo()

    if(userCheck == null){

    }else{
      const fetchData = async()=>{
        try{
          await store
        .collection("users")
        .doc(userCheck.email)
        .get()
        .then((snapshot) => {
          if (snapshot) {
            setDaysSpent(Math.floor(
              (Date.now() - new Date(snapshot.data().planStart).getTime()) /
                (1000 * 60 * 60 * 24)
            ))
            setUserObj(snapshot.data());
          }
        });
        }catch(err){
          toast.error(err)
        }
       }
       fetchData();
    }
  
    setDocRef(users)
    
    const fetchLinks = async () => {
      try {
        await store
          .collection("links")
          .doc("izyQeo1ByOWQqz1kmpb8")
          .get()
          .then((snapshot) => {
            if (snapshot) {
              var data = []
              data.push(snapshot.data())
              setLinks(data)
            }
          });
      } catch (err) {
        toast.error(err);
      }
    };
    fetchLinks();
  

  if(userObj.plan !== "free"){
    if(userObj.plan === "One Week"){
      if(daysSpent >= 7){
        updateDoc(docRef,{
          plan:"free",
          planStart: Date.now()
        })
      }
    }
    if(userObj.plan === "One Month"){
      if(daysSpent >= 30){
        updateDoc(docRef,{
          plan:"free",
          planStart: Date.now()
        })
      }
    }
    if(userObj.plan === "Three Months"){
      if(daysSpent >= 90){
        updateDoc(docRef,{
          plan:"free",
          planStart: Date.now()
        })
      }
    }
  }
  },[])

  const optOut = ()=>{
    updateDoc(docRef,{
      plan:"free",
      planStart: Date.now()
    })
    toast.success("Successfully Opted out from plan.")

  }
  

  const fund = () => {
  
    if (!fundAmount) {
      toast.warning("Please enter an amount!");
    } else {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);

          if (response) {
            if (response.status == "successful") {
              
              updateDoc(docRef,{
                walletBalance: Number(wallet) + response.amount,
              })
              fetchInfo();
              closePaymentModal();
              setFundAmount("");
              return toast.success("Account Funded Successfully");
            }
            closePaymentModal();
            return toast.error("Funding UnSuccessful");
          }
          // this will close the modal programmatically
        },
        onClose: () => {
          return toast.warning("Payment Cancelled");
        },
      });
    }
  };

  const config = {
    public_key: "FLWPUBK_TEST-041b59e378e8156458c446b3f25206fe-X",
    tx_ref: Date.now(),
    amount: Number(fundAmount),
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: "08095794273",
      name: name,
    },
    customizations: {
      title: "Deposit Amount",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

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
                {name}
              </p>
              <p style={{ fontSize: "14px" }}>{email}</p>
            </div>
          </div>
          <div style={{ textAlign:"right"}} className="wallet pl-1">
            <p style={{fontSize:"13px"}}>💰: KES {wallet}</p>
            <span style={{fontSize:"12px"}}><i>Plan : {plan}</i></span><br />
            {userObj.plan !== "free" ? <button style={{fontSize:"12px"}} className="btn btn-primary" onClick={()=>optOut()}>Opt Out</button> : null}
          </div>
        </div>
        <h4>
          Support app development and maintenance by donating, Thank you for
          your anticipation.
        </h4>
        <div className="donate">
          <p>20 KES</p>
          <button className="btn btn-black w-100">Donate</button>
        </div>
        <div className="d-flex">
          <select onChange={(e)=>setCurrency(e.target.value)} name="currency" style={{ width: "40%" }} className="form-control mr-2">
            {currencies.map((currency, index)=>{
              return <option value={currency} key={index}>{currency}</option>
              
            })}
          </select>
          <input
            placeholder="10.0"
            type="number"
            style={{ width: "25%" }}
            className="form-control mr-2"
            min={10}
            onChange={(e) => setFundAmount(e.target.value)}
          />
          <button onClick={() => fund()} className="btn btn-primary mb-2 w-100">
            &#x1F4B8; Fund Account
          </button>
        </div>
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
            <a href={links !== null ?  links[0].facebook : "#0"}>
              <FiFacebook
                id="ic"
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
            <a href={links !== null ?  links[0].telegram : "#0"}>
              <FiSend
                id="ic"
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
            <a href={links !== null ?  links[0].youtube : "#0"}>
              <FiYoutube
                id="ic"
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
            <a href={links !== null ?  `mailto: ${links[0].email}` : "#0"}>
              <FaGoogle
                id="ic"
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
            <a href={links !== null ?  links[0].whatsapp : "#0"}>
              <FaWhatsapp
                id="ic"
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
        {email == "brianongiri9@gmail.com" || email == "uwakblessing1@gmail.com" ? <NavLink to="/admin"><button className="btn btn-black w-100 mb-2">
          Admin Panel
        </button></NavLink> : null}
        <button onClick={() => logoutUser()} className="btn btn-primary w-100">
          Logout
        </button>
        
      </div>
    </div>
  );
};

export default Modal;
