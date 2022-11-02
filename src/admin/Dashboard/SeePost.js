import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  doComment,
  doReply,
  getPosts,
  deleteComment,
} from "../../redux/actionCreators/postsActionCreator";
import AddReply from "./AddReply";

const SeePost = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const { pathname } = useLocation();

  const { posts, postsLoading, isLoggedIn, user, userId } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      postsLoading: state.posts.postsLoading,
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
      userId: state.auth.userId,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const currentPost = posts.find((post) => post.postId === id && post);
  const [replyBox, setReplyBox] = useState([]);


  useEffect(() => {
    if (postsLoading) {
      dispatch(getPosts());
    }
  }, [dispatch]);

  const replyBoxSet = (data, id) => {
    setReplyBox(
      currentPost.post.comments.map((reply, i) => (i === id ? data : false))
    );
  };

  const [loading, setLoading] = useState(false)
  
 

  return (
    <div className="container" style={{margin:"6rem 0"}}>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : currentPost ? (
        
        <div >
           <Link to={`/${currentPost.post.category.toLowerCase()}`}> &lt; Back</Link>
           <h3 className=" text-capitalize">
                {currentPost.post.title}
            </h3>
          <div className="" >
            
            <div style={{height:"200px",borderRadius:"7px", overflow:"hidden"}}>
                    <img style={{borderRadius:"7px"}}
                      src={currentPost.post.image}
                      alt={currentPost.post.title}
                      className="card-img-top border-bottom"
                    />
                    </div>
          </div>
          <div className="p-1 pt-4 mb-3">
            <div className="align-items-center justify-content-between">
             
              <div className="d-flex">
                {currentPost.post.category.split(",").map((category, id) => (
                  <p style={{ fontSize: "14px", marginBottom:".5rem"}} key={id} className="bg-primary px-2 py-1 text-white">
                   
                         {new Date(currentPost.post.updatedAt).toLocaleString()}
                       
                  </p>
                  
                ))}
              </div>
            </div>
            <div >
              <p className="card-text" style={{wordWrap:"break-word"}}>
                {currentPost.post.description}
              </p>
              
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center">
          Post with id <span className="text-primary">{id}</span> does not
          exists
        </h1>
      )}{" "}
    </div>
  );
};

export default SeePost;
