import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/fire";
import fire from "../../config/fire";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [docRef, setDocRef] = useState({});

  const [posts, setPosts] = useState();

  useEffect(() => {
    const db = fire.firestore();
    return db.collection("users").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setPosts(postData);
    });
    
  }, []);

  return (
    <div className="container">
      <h3 className="text-center my-3">Users</h3>
      <div style={{overflowX:"auto"}}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Plan</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {!posts
            ? null
            : posts.map((user, id) => {
                return <tr key={id}>
                <td>{id}</td>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>{user.plan}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
              </tr>
              })}
        </tbody>
      
      </table>
      </div>
    </div>
  );
};

export default Home;
