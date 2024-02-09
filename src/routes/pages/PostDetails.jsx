import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getPostDetails from "../getRequests/getPostDetails";
import useLikePost from "../postRequests/postLike";
import Moment from "moment";
import addIcon from "../../assets/add.png";
import likeIcon from "../../assets/like.png";
import { useNavigate } from "react-router-dom";

const PostDetails = ({
  currentUser,
  postViewed,
  setUserViewed,
}) => {
  const { postDetails, error, loading } = getPostDetails(postViewed);
  const { attemptLikePost } = useLikePost();

  const navigate = useNavigate();

  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  function likePost(e) {
    attemptLikePost(currentUser._id, postViewed);
  }

  function setUserId(e) {
    let userID = e.target.className;
    setUserViewed(userID);
  }

  function userSelect(e) {
    let userID = e.target.className;
    setUserViewed(userID);
    if (userID === currentUser._id) {
      navigate("/profile");
    } else {
      navigate("/userProfile");
    }
  }

  let postTimestamp = postDetails.post.timestamp;
  postTimestamp = Moment(postTimestamp).format("h:mm: a, MM/DD/YY, ");

  return (
    <div className="page">
      <h1 className="pageTitle">Post Details</h1>
      {currentUser ? (
        <div className="postDetails">
          <div className="postBox">
            <div id="postTitleBox">
              <h3>{postDetails.post.title}</h3>
            </div>
            <div id="postTextBox">
              <p>{postDetails.post.text}</p>
            </div>
            <div id="postBar">
              <div id="userBar">
                <button
                  id="userLink"
                  className={postDetails.post.user._id}
                  onClick={userSelect}
                >
                  <p id="postUser" className={postDetails.post.user._id}>
                    {postDetails.post.user.username}
                  </p>
                </button>
                <p id="postTime">{postTimestamp}</p>
              </div>
              <div id="likeBar">
                <button onClick={likePost}>
                  <img id="likeIcon" alt="Like Icon" src={likeIcon} />
                </button>
                <p>({postDetails.post.likes.length})</p>
              </div>
            </div>
          </div>

          <div className="postDetailCommentBox">
            <div className="headerBox">
              <Link className="addButtonBox" to="/newComment">
                <img
                  src={addIcon}
                  alt="link to update profile"
                  className="addIcon"
                />
              </Link>
              <h2 className="tableHeader" id="commentSection">
                Comments:
              </h2>
            </div>
            <div className="tableBox">
              {postDetails.comments.map((comment, index) => {
                let timestamp = comment.timestamp;
                timestamp = Moment(timestamp).format("h:mm: a, MM/DD/YY, ");
                let isUser = false;
                if (currentUser._id === comment.user._id) isUser = true;
                return (
                  <>
                    <br />
                    <div className="commentBox">
                      <button
                        onClick={setUserId}
                        id="commentUser"
                        key={comment.user._id}
                      >
                        {isUser ? (
                          <Link
                            to="/profile"
                            className={comment.user._id}
                            id="userCommentLink"
                          >
                            {comment.user.username}
                          </Link>
                        ) : (
                          <Link
                            to="/userProfile"
                            className={comment.user._id}
                            id="userCommentLink"
                          >
                            {comment.user.username}
                          </Link>
                        )}
                      </button>
                      <p className="commentText">{comment.text}</p>
                    </div>
                    <div className="timestampBox">
                      <p>{timestamp}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="signInMessage">
          <p>Must be Signed In to view this page</p>
          <div className="signInUp">
            <Link to="/blog/sign-in" className="signInButton">
              Sign In
            </Link>
            <Link to="/blog/sign-up" className="signInButton">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
