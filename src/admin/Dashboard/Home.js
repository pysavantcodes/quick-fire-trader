import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/fire";
import fire from "../../config/fire";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
// import { initializeApp } from "firebase-admin/app";

const Home = () => {
  const [docRef, setDocRef] = useState({});
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  

  const [posts, setPosts] = useState();

  useEffect(() => {
    const db = fire.firestore();
    return db.collection("users").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setPosts(postData);
    });
  }, []);

  const deleteUser = () => {
    const markedForDelete = [];

    //   admin
    //     .auth()
    //     .getUsers("uwakblessing1@gmail.com")
    //     .then((result) => {
    //       // Mark disabled accounts for deletion.
    //       // result.users.forEach((user) => {
    //       //   if (user.disabled) {
    //       //     markedForDelete.push(user.uid);
    //       //   }
    //       // });

    //       // result.notFound.forEach((uid) => {
    //       //   console.log(`No user found for identifier: ${JSON.stringify(uid)}`);
    //       // });
    //       console.log(result);
    //     })
    //     .then(() => {
    //       // Delete all marked user accounts in a single API call.
    //       // return admin.auth().deleteUsers(markedForDelete);
    //     });
  };

  const updateWhatsapp = ()=>{
    if(!whatsapp){
      toast.warning("Please input field")
    }else{
      fire.firestore().collection("links").doc("izyQeo1ByOWQqz1kmpb8").update({
        whatsapp: `https://wa.me/${whatsapp}/`,
      }).then((docRef)=>{
        toast.success("Updated Whatsapp Number");
        setWhatsapp("");
      })
      .catch((err)=>{
        console.log("Error:", err);
        toast.error("Error in updating")
      })

    }
    
  }
  const updatetelegram = ()=>{
    if(!telegram){
      toast.warning("Please input field")
    }else{
      fire.firestore().collection("links").doc("izyQeo1ByOWQqz1kmpb8").update({
        telegram,
      }).then((docRef)=>{
        toast.success("Updated Telegram Link");
        setTelegram("");
      })
      .catch((err)=>{
        console.log("Error:", err);
        toast.error("Error in updating")
      })

    }
    

  }
  const updateEmail = ()=>{
    if(!email){
      toast.warning("Please input field")
    }else{
      fire.firestore().collection("links").doc("izyQeo1ByOWQqz1kmpb8").update({
        email,
        
      }).then((docRef)=>{
        toast.success("Updated Email address");
        setEmail("");
      })
      .catch((err)=>{
        console.log("Error:", err);
        toast.error("Error in updating")
      })

    }
    


  }
  const updateYoutube = ()=>{
    if(!youtube){
      toast.warning("Please input field")
    }else{
      fire.firestore().collection("links").doc("izyQeo1ByOWQqz1kmpb8").update({
        youtube,
      }).then((docRef)=>{
        toast.success("Updated Youtube Link");
        setYoutube("");
      })
      .catch((err)=>{
        console.log("Error:", err);
        toast.error("Error in updating")
      })

    }
    

  }
  const updateFacebook = ()=>{

    if(!facebook){
      toast.warning("Please input field")
    }else{
      fire.firestore().collection("links").doc("izyQeo1ByOWQqz1kmpb8").update({
        facebook,
      }).then((docRef)=>{
        toast.success("Updated Facebook Link");
        setFacebook("");
      })
      .catch((err)=>{
        console.log("Error:", err);
        toast.error("Error in updating")
      })

    }
    

  }

  return (
    <div className="container">
      <h3 className="text-center my-3">Users</h3>
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Country</th>
              <th scope="col">Balance</th>
              <th scope="col">Plan</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              {/* <th scope="col">Delete User</th> */}
            </tr>
          </thead>
          <tbody>
            {!posts
              ? null
              : posts.map((user, id) => {
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{user.name}</td>
                      <td>{user.country}</td>
                      <td>{user.walletBalance.toFixed(2)}</td>
                      <td>{user.plan}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      {/* <td>
                        <button
                          onClick={() => deleteUser()}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  );
                })}
          </tbody>
        </table>
        
      </div>
      <div className="card p-3 mt-5">
          <h3 style={{ fontSize: "20px" }} className="mb-3">
            Update Links
          </h3>
          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Whatsapp Number"
              value={whatsapp}
              onChange={(e)=>setWhatsapp(e.target.value)}
            />
            <button onClick={()=>updateWhatsapp()} className="btn btn-primary">Update</button>
          </div>
          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Telegram Link"
              value={telegram}
              onChange={(e)=>setTelegram(e.target.value)}
            />
            <button onClick={()=>updatetelegram()} className="btn btn-primary">Update</button>
          </div>
          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <button onClick={()=>updateEmail()} className="btn btn-primary">Update</button>
          </div>
          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Youtube Link"
              value={youtube}
              onChange={(e)=>setYoutube(e.target.value)}
            />
            <button onClick={()=>updateYoutube()} className="btn btn-primary">Update</button>
          </div>
          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Facebook Link"
              value={facebook}
              onChange={(e)=>setFacebook(e.target.value)}
            />
            <button onClick={()=>updateFacebook()} className="btn btn-primary">Update</button>
          </div>
        </div>
    </div>
  );
};

export default Home;
