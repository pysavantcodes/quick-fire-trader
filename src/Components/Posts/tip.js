import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";
import Ripples from "react-ripples";

const Tips = () => {
  const { posts, postsLoading, isLoggedIn, userId } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      postsLoading: state.posts.postsLoading,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    }),
    shallowEqual
  );

  const examPost = posts.filter((post) => {
    return post.post.category == "Tips";
  });

  const [loading, setLoading] = useState(false);

  examPost.sort((a, b) => {
    const postA = new Date(a.post.createdAt);
    const postB = new Date(b.post.createdAt);

    if (postA < postB) return 1;
    if (postA > postB) return -1;
    return 0;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="container">
      <div className="row px-4">
        <div className="w-100">
          <div className="row ">
            {examPost.length == 0 && (
              <>
                <h5>No Tips available yet <span style={{opacity:"0"}}>why hyebbdno</span></h5>
                <p>Please wait....</p>
              </>
            )}
            {loading
              ? "Loading..."
              : examPost.map((post, id) => (
                  <Ripples key={id}>
                    <Link to={`/post/${post.postId}/${post.post.title}`}>
                      <div className="col-md-5 mx-auto px-0 w-100 card mb-3">
                        <div
                          style={{
                            height: "200px",
                            borderRadius: "7px",
                            overflow: "hidden",
                          }}
                        >
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
                          <p
                            style={{
                              fontSize: "13px",
                            }}
                            className="card-text text-heading text-*-justify"
                          >
                            {post.post.description
                              .substring(0, 1)
                              .toUpperCase() +
                              post.post.description.substring(1, 200)}
                            ...{" "}
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              margin: "0",
                              marginTop: "12px",
                              fontWeight: "500",
                            }}
                          >
                            {new Date(post.post.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Ripples>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
