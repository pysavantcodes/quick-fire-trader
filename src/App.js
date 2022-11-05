import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Admin from "./admin";

import Home from "./Components/Home/index";
import "./App.css";
import Navbar from "./Components/Navbar/index";
import Footer from "./Components/Navbar/footer";
import { useDispatch, useSelector } from "react-redux";
import SubNavbar from "./Components/Navbar/SubNavbar";
import fire from "./config/fire";
import SeePost from "./admin/Dashboard/SeePost";
import Offline from "./Components/Offline";
import Posts from "./Components/Posts";
import Results from "./Components/Posts/shop";
import Register from "./auth/Register";
import Auth from "./auth"
import Shop from "./Components/Posts/shop";
import Tips from "./Components/Posts/tip";
import Signal from "./Components/Posts/signal";

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const history = useHistory();

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
        if (window.location.pathname === "/")
       
          history.push("/home");
        history.push(window.location.pathname);
       
      } else {
        history.push("/auth/login");
        
      }
    });
  }, [dispatch]);


  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
      }
    });
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [onLine, setOnLine] = useState(false);

  useEffect(() => {
    setOnLine(navigator.onLine);
    if (!onLine) dispatch({ type: "RESET_USER" });
  }, [navigator.onLine]);

  if (!onLine) {
    return <Offline />;
  }
  
 

  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route path={""}>
          {!pathname.includes("/admin") && !pathname.includes("/auth") ? <Navbar /> : null}
          
          
          <Route path="/" element={<Switch to="/auth/login" />} />
          <Route path={"/home"} >
            <Home/>
          </Route>
          <Route path={"/posts"}>
            <Posts />
          </Route>
          <Route path={"/shop"}>
            <Shop />
          </Route>
          <Route path={"/tips"}>
            <Tips />
          </Route>
          <Route path={"/signal"}>
            <Signal />
          </Route>
          <Route exact path={"/post/:id/:title"}>
            <SeePost />
          </Route>
          <Route path={"/admin"}>
            <Admin />
          </Route>
          <Route path={"/auth"}>
            <Auth />
          </Route>
          {!pathname.includes("/admin") && !pathname.includes("/auth") ? <Footer /> : null}
          
        </Route>
      </Switch>
    </div>
  );
};

export default App;
