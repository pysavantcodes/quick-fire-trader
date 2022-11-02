import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSend } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

const Login = ({ loginUser }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isLoggedIn) history.push("/home");
  });

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !pass) {
      return toast.warning("Please fill in all fields");
    } else {
      setLoading(true)
      loginUser(email, pass);
      
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
        <h1 style={{fontSize:"30px", marginBottom:"0"}} className="text-center font-weight-bolder">
          Quick Fire Traders
          </h1>
          <p style={{fontSize:"13px", marginBottom:"0"}} className="text-center">Forex, Cryptocurrency, Commodity and indices signals app <br />Please login to continue</p>

          <div className="col-md-5 p-2 mt-5 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block btn-dark" disabled={loading ? true : false}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              <p>
                Don't have an account? <Link to="/auth/register">Register</Link>
              </p>

              <div>
                <div style={{textAlign:"center", marginTop:"4rem"}} className="connect">
                  <p>Failed to Login? Contact us now...</p>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
