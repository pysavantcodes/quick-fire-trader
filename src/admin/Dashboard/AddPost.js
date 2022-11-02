import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPosts, newPost } from "../../redux/actionCreators/postsActionCreator";

const AddPost = () => {
  const userId = useSelector((state) => state.auth.userId);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("0");
  const [mode, setMode] = useState("Tips");
  const [progress, setProgress] = useState(0);
  const [currency, setCurrency] = useState("");
  const [option, setOption] = useState("");
  const [tp, setTP] = useState("");
  const [tpValue, setTPValue] = useState("");
  const [sLValue, setSLValue] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description) {
      return toast.warning("Please fill in all fields!");
    }

    if (!image || image === undefined) {
      return toast.warning("Please select an image!");
    }
   
    if (description.length < 100) {
      return toast.info("Description should be of atleast 100");
    }
    if (title.trim().split(" ").length < 2) {
      return toast.info("Title should be of atleast 2 words");
    }
    if (image.size > 5242880) {
      return toast.info("Image should be less than or equal to 5 MB");
    }
    const data = {
      title,
      category,
      description,
      image,
      price,
      currency,
      option,
      tp,
      sLValue,
      tpValue,
    };
    setUploading(true)
    dispatch(newPost(data, userId, user.displayName, setProgress));
    setTitle("")
    setImage("")
    setDescription("")
    setPrice("")
    
  };

  

  

  const categories = (e) => {
    setCategory(e.target.value);
    setMode(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5 text-right">
          <Link to="/admin/dashboard/" className="btn btn-dark mr-2">
            Go to Dashboard
          </Link>
        </div>
        <div className="col-md-12 mb-3">
          <h1 className="display-5 text-dark text-center">Upload to {mode} </h1>
        </div>
        <div className="col-md-6 mx-auto  p-5">
         
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <select onChange={(e) => categories(e)}>
                  <option value="Tips">Tips</option>
                  <option value="Shop">Shop</option>
                </select>
              </div>
              {mode == "Shop" ? (
                <div className="form-group">
                <input
                  type="number"
                  placeholder="Price in $"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div> 
              ): null}
              <div className="form-group">
                <textarea
                  placeholder="Enter Description"
                  className="form-control"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
              {/* {mode == "Shop" ? (
                <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  // onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              ): null} */}
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-dark btn-block"
                  value={`Add to ${mode}`}
                />
              </div>
              {
                uploading && progress !== 100 ? "Uploading, please wait..." : "Uploaded, waiting for next upload"
              }
            </form>
       
        </div>
      </div>
    </div>
  );
};

export default AddPost;
