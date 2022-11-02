import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import PullToRefresh from "react-simple-pull-to-refresh";
import { useState } from "react";
import store from "../..";

const Signal = () => {
  const { posts, postsLoading,uploaded, isLoggedIn, userId } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      postsLoading: state.posts.postsLoading,
      uploaded: state.posts.uploaded,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    }),
    shallowEqual
  );

  const [loading, setLoading] = useState(false)


  const signal = posts.filter((post) => {
    return post.post.category == "Signal";
  });

  signal.sort((a, b) => {
    const postA = new Date(a.post.createdAt);
    const postB = new Date(b.post.createdAt);

    if (postA < postB) return 1;
    if (postA > postB) return -1;
    return 0;
  });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (postsLoading) {
  //     dispatch(getPosts());
  //   }
  // }, [dispatch]);


  useEffect(()=>{
    dispatch(getPosts())

  },[])





  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div
      style={{ padding: "0 .6rem", marginBottom: "7rem" }}
      className="container"
    >
   
        {signal.length == 0 && (
          <>
            <h5>No Signal available yet</h5>
            <p>Please wait....</p>
          </>
        )}
        {loading
          ? "Loading Signals..."
          : signal.map((signal) => {
              const tp = signal.post.tp.split("\n");
              const tpVal = signal.post.tpValue.split("\n");
              return (
                <div key={signal.post.createdAt} className="signal card">
                  <div className="head">
                    <p>{signal.post.currency}</p>
                    <p className={signal.post.option == "Buy" ? "buy" : "sell"}>
                      {signal.post.option}
                    </p>
                  </div>

                  <div className="values">
                    <ul className="tp">
                      {tp.map((tp) => {
                        return <li key={tp}>{tp}</li>;
                      })}
                      <li>SL</li>
                    </ul>
                    <ul className="tpVal">
                      {tpVal.map((tpVal) => {
                        return <li key={tpVal}>{tpVal}</li>;
                      })}
                      <li>{signal.post.sLValue}</li>
                    </ul>
                  </div>
                  <p
                    style={{ fontSize: "14px", color: "rgb(0, 202, 0)" }}
                    className="py-1"
                  >
                    {new Date(signal.post.updatedAt).toLocaleString()}
                  </p>
                </div>
              );
            })}
  
    </div>
  );
};

export default Signal;
