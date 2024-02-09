import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import likeIcon from "../../assets/like.png";
import getNewsFeed from "../getRequests/getNewsFeed";
import Moment from "moment";
import { useNavigate } from "react-router-dom";

const Summary = ({ currentUser, setPostViewed, setUserViewed }) => {
  const { postList, error, loading } = getNewsFeed(currentUser._id);
  const navigate = useNavigate();

  function postSelect(e) {
    let postID = e.target.className;
    setPostViewed(postID);
  }

  const commentSelect = (e) => {
    let postID = e.target.className;
    setPostViewed(postID);
    navigate("/post");
    setTimeout(() => {
      const commentSection = document.getElementById("commentSection");
      if (commentSection) {
        commentSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  function userSelect(e) {
    let userID = e.target.className;
    setUserViewed(userID);
    if (userID === currentUser._id) {
      navigate("/profile");
    } else {
      navigate("/userProfile");
    }
  }


  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="page">
      {currentUser ? (
        <div className="page">
          <div className="profileNewsFeed">
            <h2>News Feed</h2>
            {postList.length ? (
              <div className="allPosts">
                {postList.map((post, index) => {
                  let timestamp = post.timestamp;
                  timestamp = Moment(timestamp).format("h:mm: a, MM/DD/YY, ");
                  return (
                    <div className="postBox" key={post._id}>
                      <button onClick={postSelect}>
                        <Link id="postLink" className={post._id} to="/post">
                          <div id="postTitleBox" className={post._id}>
                            <h3 className={post._id}>{post.title}</h3>
                          </div>
                          <div id="postTextBox" className={post._id}>
                            <p className={post._id}>{post.text}</p>
                          </div>
                        </Link>
                      </button>
                      <div id="postBar" className={post._id}>
                        <div id="userBar">
                          <button
                            id="userLink"
                            className={post.user._id}
                            onClick={userSelect}
                          >
                            <p id="postUser" className={post.user._id}>
                              {post.user.username}
                            </p>
                          </button>
                          <p id="postTime">{timestamp}</p>
                        </div>
                        <div id="likeBar" className={post._id}>
                          <img
                            src={likeIcon}
                            className={post._id}
                            id="likeIcon"
                            alt="Like Icon"
                          />
                          <p className={post._id}>({post.likes.length})</p>
                          <button
                            id="userLink"
                            className={post._id}
                            onClick={commentSelect}
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No Posts</p>
            )}
          </div>
        </div>
      ) : (
        <div className="signInMessage">
          <h1 className="pageTitle">Home</h1>
          <p>Must be Signed In to view this page</p>
          <div className="signInUp">
            <Link to="/sign-in" className="signInButton">
              Sign In
            </Link>
            <Link to="/sign-up" className="signInButton">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
