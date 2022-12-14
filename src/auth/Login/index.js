import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSend } from "react-icons/fi";
import { FaGoogle, FaWhatsapp } from "react-icons/fa";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import fire from "../../config/fire";
import { EmailShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";


const Login = ({ loginUser }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const store = fire.firestore();
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
    if (isLoggedIn) {
      history.push("/home");
    }
  });

  useEffect(()=>{
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

  },[])

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !pass) {
      return toast.warning("Please fill in all fields");
    } else {
      setLoading(true);
      loginUser(email, pass);
      setLoading(false);
    }
  };

  const auth = getAuth();

  const triggerResetEmail = async () => {
    if(email == ""){
      return toast.warning("Please enter your email")

    }else{
      try{
        await sendPasswordResetEmail(auth, email);
      return toast.success(`Password reset email sent to ${email}, (Check your spams for mail)`);
      }catch(err){
        return toast.error(`${email} does not have a registered account`);
      }
    }
  };

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
            Please login to continue
          </p>

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
                <button
                  type="submit"
                  className="btn btn-block btn-dark"
                  disabled={loading ? true : false}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              <p>
                Don't have an account? <Link to="/auth/register">Register</Link>
              </p>
              <p style={{textDecoration:"underline"}} onClick={triggerResetEmail}>Reset Password</p>

              <div>
                <div
                  style={{ textAlign: "center", marginTop: "4rem" }}
                  className="connect"
                >
                  <p>Failed to Login? Contact us now...</p>
                  <a href={links !== null ?  links[0].telegram : "#0"}>
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
                  <a href={links !== null ?  `mailto: ${links[0].email}` : "#0"}>
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
                  <a href={links !== null ?  links[0].whatsapp : "#0"}>
                    <FaWhatsapp
                      style={{
                        color: "#202646",
                        fontSize: "50px",
                        padding: ".7rem",
                        background: "rgba(184, 184, 184, 0.7)",

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

export default Login;
