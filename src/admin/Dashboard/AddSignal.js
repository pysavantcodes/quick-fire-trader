import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPosts, newPost, newSignal } from "../../redux/actionCreators/postsActionCreator";

const AddSignal = () => {
  const userId = useSelector((state) => state.auth.userId);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [currency, setCurrency] = useState("");
  const [option, setOption] = useState("");
  const [tp, setTP] = useState("");
  const [tpValue, setTPValue] = useState("");
  const [sLValue, setSLValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState("Tips");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currency || !option || !tp || !sLValue || !tpValue) {
      return toast.warning("Please fill in all fields!");
    }
    const category = "Signal";
    const data = {
      title,
      description,
      image,
      price,
      currency,
      option,
      tp,
      sLValue,
      tpValue,
      category
    };
    setUploading(true)
    dispatch(newPost(data, userId, user.displayName, setProgress));
    setCurrency("")
    setSLValue("")
    setTPValue("")
    setTP("")
    
  };

  
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5 text-right">
          <Link to="/admin/dashboard" className="btn btn-dark mr-2">
            Go to Dashboard
          </Link>
        </div>
        <div className="col-md-12 mb-3">
          <h1 className="display-5 text-dark text-center">Upload Signal </h1>
        </div>
        <div className="col-md-6 mx-auto  p-3">
         
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="GOLD @ 3500"
                  className="form-control"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                />
              </div>
              <div className="form-group">
                <select onChange={(e) => setOption(e.target.value)}>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>
              
              <div style={{columnGap:"10px"}} className="form-group d-flex">
                <textarea
                  placeholder=" Enter TP as: 
                  TP1
                  TP2
                  TP3
                  TP4
                  ....
                  "
                  className="form-control"
                  rows="8"
                  value={tp}
                  onChange={(e) => setTP(e.target.value)}
                ></textarea>
                <textarea
                  placeholder=" Enter TP value as: 
                  10200
                  10200
                  10200
                  10200
                  .....
                  "
                  className="form-control"
                  rows="8"
                  value={tpValue}
                  onChange={(e) => setTPValue(e.target.value)}
                ></textarea>
                {/* <textarea
                  placeholder="Enter Description"
                  className="form-control"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea> */}
              </div>
              <div style={{columnGap:"10px"}} className="form-group d-flex">
                <input
                  type="text"
                  placeholder="SL"
                  className="form-control"
                  value="SL"
                  disabled
                />
                <input
                  type="number"
                  placeholder="35000"
                  className="form-control"
                  value={sLValue}
                  onChange={(e) => setSLValue(e.target.value)}
                />
              </div>
           
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-dark btn-block"
                  value={`Add to signals`}
                />
              </div>
              {
                uploading && progress !== 100 ? "Uploading, please wait..." : "Uploaded, waiting for next upload"
              }
              <p onClick={()=>getPosts()}>Get</p>
            </form>
          
        </div>
      </div>
    </div>
  );
};

export default AddSignal;
