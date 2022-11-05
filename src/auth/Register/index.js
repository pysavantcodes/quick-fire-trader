import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { FaGoogle, FaWhatsapp } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { EmailShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";

const Register = ({ registerUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Afghanistan");
  const [loading, setLoading] = useState(false);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const history = useHistory();

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.warning("Please fill in all fields!!");

    } else if(password !==confirmPassword){
      return toast.warning("Passwords do not match!!");
    } else {
      setLoading(true);
      registerUser({ name, email, password, confirmPassword, country });
      history.push("/auth/login");
    }
  };

  useEffect(() => {
    const getCountries = async () => {
      setLoadingCountries(true);
      const fetched = await fetch("https://restcountries.com/v3.1/all");
      const data = await fetched.json();
      setLoadingCountries(false);

      function compareName(a, b) {
        const name1 = a.name.common.toUpperCase();
        const name2 = b.name.common.toUpperCase();

        let comparison = 0;

        if (name1 > name2) {
          comparison = 1;
        } else if (name1 < name2) {
          comparison = -1;
        }
        return comparison;
      }
      setCountries(data.sort(compareName));
    };

    getCountries();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1
            style={{ fontSize: "30px", marginBottom: "0" }}
            className="text-center font-weight-bolder"
          >
            Quick Fire Traders
          </h1>
          <p
            style={{ fontSize: "13px", marginBottom: "0" }}
            className="text-center"
          >
            Forex, Cryptocurrency, Commodity and indices signals app <br />
            Please create account to continue
          </p>

          <div className="col-md-5 p-2 mt-5 mx-auto">
            <form onSubmit={handleSubmit}>
              <label htmlFor="country">Select Country:</label>
              {loadingCountries ? (
                <p>Loading Countries...</p>
              ) : (
                <select onChange={(e)=>setCountry(e.target.value)} name="country" style={{ marginBottom: "1rem" }}>
                  {countries.map((country) => {
                    return (
                      <option
                        key={country.name.common}
                        value={country.name.common}
                        
                      >
                        {country.name.common}
                      </option>
                    );
                  })}
                </select>
              )}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
              <button type="submit" className="btn btn-block btn-dark" disabled={loading ? true : false}>
                  {loading ? "Creating account..." : "Register"}
                </button>
              </div>
              <p>
                Already Have account? <NavLink to="/auth/login">Login</NavLink>
              </p>
              <div>
                <div
                  style={{ textAlign: "center", marginTop: "4rem" }}
                  className="connect"
                >
                  <p>Failed to Register? Contact us now...</p>
                  <a href="https://t.me/+v8SGq97FkEk4YzRk">
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
                  </a>
                  <a href="https://quickfiretraders@gmail.com/">
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
                  </a>
                  <a href="https://wa.me/+254719832751/">
                    <FaWhatsapp
                      style={{
                        color: "#202646",
                        fontSize: "50px",
                        padding: ".7rem",
                        background: "rgba(184, 184, 184, 0.7)",
                        margin: ".7rem",
                        borderRadius: "50%",
                      }}
                    />
                  </a> 
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
