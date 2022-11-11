import React from "react";
import Img from "./Privacy policy-pana.png";
import { FaWhatsapp } from "react-icons/fa";

const Blocked = ({ links }) => {
  return (
    <div className="modal-bg-blocked">
      <div className="mod-blocked">
        <div style={{ width: "190px" }}>
          <img className="w-100" src={Img} alt="" />
        </div>
        <div className="text-center">
          <h3>Error !!</h3>
          <p>
            Sorry to inform you, your account has been disabled by the admin.
            You can't perform any activity on this application.
          </p>
        </div>
        <div className="connect p-3 text-center">
          <p>
            <b>Try contacting the admin:</b>
          </p>
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
        </div>
      </div>
    </div>
  );
};

export default Blocked;
