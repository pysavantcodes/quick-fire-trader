import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";

const Shop = () => {
  const { posts, postsLoading, isLoggedIn, userId } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      postsLoading: state.posts.postsLoading,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    }),
    shallowEqual
  );

  const resultsPost = posts.filter((post)=>{
    return post.post.category == "Shop"
  })

  const [loading, setLoading] = useState(false)
 

  resultsPost.sort((a, b) => {
    const postA = new Date(a.post.createdAt);
    const postB = new Date(b.post.createdAt);

    if (postA < postB) return 1;
    if (postA > postB) return -1;
    return 0;
  });

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPosts())

  },[])


  return (
    <div className="container">
      <div className="row px-4">
        <div className="w-100">
       
          <div className="row">
            {resultsPost.length == 0 && <>
              <h5>No Shop Item available yet</h5>
                <p>Please wait....</p>
              </>}
            {loading
              ? "Loading..."
              : resultsPost.map((post, id) => (
                  <div
                    className="col-md-5 mx-auto px-0 w-100 card mb-3"
                    key={id}
                  >
                    <div style={{height:"200px",borderRadius:"7px", overflow:"hidden"}}>
                    <img
                      src={post.post.image}
                      alt={post.post.title}
                      className="card-img-top border-bottom"
                    />
                    </div>
                    <div className="card-body px-4">
                      <h3 className="card-title text-capitalize">
                        {post.post.title}
                      </h3>
                      <p style={{
                            fontSize: "13px",
                          }} className="card-text text-heading text-*-justify">
                        {post.post.description.substring(0, 1).toUpperCase() +
                          post.post.description.substring(1, 200)}
                        ...
                        
                      </p>
                      <div className="d-flex">
                          <p
                            className="small bg-dark mr-2 py-1 px-2 text-white"
                          
                          >
                            ${post.post.price}
                          </p>
                      
                      </div>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-between bg-white pb-3 border-0">
                     
                        <Link
                          to={`/post/${post.postId}/${post.post.title}`}
                          className="btn btn-block btn-primary"
                        >
                           Purchase Item
                        </Link>
                      
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
