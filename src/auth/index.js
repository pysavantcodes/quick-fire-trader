import React, { useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch, Navigate } from "react-router-dom";
import { createUserDocument } from "../config/fire";

import Login from "./Login";
import fire from "../config/fire";
import { toast } from "react-toastify";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const history = useHistory();
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
        if (window.location.pathname === "/auth")
       
          history.push("/home");
        history.push(window.location.pathname);
       
      } else {
        history.push("/auth/login");
        
      }
    });
  }, [dispatch]);

  
  // login user
  const loginUser = (email, password) => {
   
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: "SET_USER", payload: user });
        toast.success("Successfully Logged In");
        <Switch to="/"/>
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
        
          return toast.error("Invalid Email or Password");
          
        }
        if (err.code === "auth/invalid-email") {
 
          return toast.error("Please enter valid email");
          
        }
      });
  };

  // register user
  const registerUser = ({ name, email, password, confirmPassword, country, phone }) => {
    if (!name || !email || !password || !confirmPassword || !country || !phone) {
      return toast.warning("Please fill in all fields!!");
    }

    if (password !== confirmPassword) {
      return toast.warning("Passwords donot match!");
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const currentUser = fire.auth().currentUser;
        toast.success("Successfully Created Account");
        fire.firestore().collection("users").doc(email).set({
          name,
          email,
          country,
          walletBalance: 0,
          phone,
          plan:"free",
          createdAt: Date.now(),
          planStart: Date.now(),
          blocked:false
        }).then((docRef)=>{
          const docId = docRef.id;
          console.log(docId);
        })
        .catch((err)=>{
          console.log("Error:", err);
        })
       
        history.push("/home")
        console.log("done")
        currentUser.updateProfile({
          displayName: name,
        });
        
        dispatch({ type: "SET_USER", payload: currentUser });
        
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast.error("User already exists");
        }
      });
  };

  return (
    <Switch>
      <Route path={`${path}/login`}>
        <Login loginUser={loginUser}/>
      </Route>
      <Route path={`${path}/register`}>
        <Register registerUser={registerUser} />
      </Route>
    
    </Switch>
  );
};

export default Auth;
