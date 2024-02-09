import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getPostDetails from "../getRequests/getPostDetails";
import useNewComment from "../postRequests/postNewComment";
import Moment from "moment";
import addIcon from "../../assets/add.png";
import likeIcon from "../../assets/like.png";
import { useNavigate } from "react-router-dom";

const NewComment = ({ currentUser, postViewed, userToken }) => {
  const { postDetails, error, loading } = getPostDetails(postViewed);
  const { attemptNewComment } = useNewComment();
  const [currentComment, setCurrentComment] = useState("");

  const navigate = useNavigate();

  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  function handleCommentChange(e) {
    setCurrentComment(e.target.value);
  }

  function newCommentSubmit(e) {
    attemptNewComment(currentUser._id, userToken, postViewed, currentComment);
    navigate("/post");
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
                <button id="userLink">
                  <p id="postUser">{postDetails.post.user.username}</p>
                </button>
                <p id="postTime">{postTimestamp}</p>
              </div>
              <div id="likeBar">
                <img id="likeIcon" alt="Like Icon" src={likeIcon} />
                <p>({postDetails.post.likes.length})</p>
              </div>
            </div>
          </div>
          <div className="postDetailCommentBox">
            <div className="newCommentBox">
              <textarea
                className="newMessageInput"
                value={currentComment}
                onChange={handleCommentChange}
              ></textarea>
              <button className="newMessageButton" onClick={newCommentSubmit}>
                Submit
              </button>
            </div>
            <div className="headerBox">
              <h2 className="tableHeader">Comments:</h2>
            </div>
            <div className="tableBox">
              {postDetails.comments.map((comment, index) => {
                let timestamp = comment.timestamp;
                timestamp = Moment(timestamp).format("h:mm: a, MM/DD/YY, ");
                return (
                  <>
                    <br />
                    <div className="commentBox">
                      <button id="commentUser" key={comment.user._id}>
                        <Link className={comment.user._id} id="userCommentLink">
                          {comment.user.username}
                        </Link>
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

export default NewComment;
