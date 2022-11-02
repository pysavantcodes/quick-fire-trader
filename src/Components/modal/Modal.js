import React from "react";
import { FiUser } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
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
          {/* <button className="btn btn-primary w-100">Donate</button> */}
          <GooglePayButton
          
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Demo Merchant",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: "2",
                currencyCode: "USD",
                countryCode: "US",
              },
            }}
            onLoadPaymentData={(paymentRequest) => {
              console.log("load payment data", paymentRequest);
            }}
            // onPaymentAuthorized={(paymentData)=>{
            //   console.log(paymentData);
            //   return {transactionState: "SUCCESS"}
            // }}
            buttonColor="black"
            buttonType="donate"
          />
        </div>
        <button className="btn btn-primary w-100">Share app</button>
        <div className="connect">
          <p>Connect to us Via</p>
          <div>
            <FiFacebook
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",
                margin: ".7rem",
                borderRadius: "50%",
              }}
            />
            <FiSend
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",
                margin: ".7rem",
                borderRadius: "50%",
              }}
            />
            <FiYoutube
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",
                margin: ".7rem",
                borderRadius: "50%",
              }}
            />
            <FaGoogle
              style={{
                color: "#202646",
                fontSize: "50px",
                padding: ".7rem",
                background: "rgba(184, 184, 184, 0.7)",
                margin: ".7rem",
                borderRadius: "50%",
              }}
            />
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
