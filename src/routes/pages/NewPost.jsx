import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useNewPost from "../postRequests/postNew";

const NewPost = ({ userToken, currentUser, setPostViewed }) => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentText, setCurrentText] = useState("");
  const { newPost, attemptNewPost } = useNewPost();
  function newPostSubmit(e) {
    attemptNewPost(
      currentUser._id,
      userToken,
      currentTitle,
      currentText,
      setPostViewed
    );
  }

  function handleTitleChange(e) {
    setCurrentTitle(e.target.value);
  }

  function handleTextChange(e) {
    setCurrentText(e.target.value);
  }

  return (
    <div className="page">
      <h1 className="pageTitle">New Post</h1>

      {currentUser ? (
        <div className="page">
          <div className="newPostFormBox">
            <form className="newPostForm">
              <label className="formTitle">
                Title:
                <input
                  className="formTitleInput"
                  type="text"
                  onChange={handleTitleChange}
                />
              </label>
              <label className="formText">
                Text:
                <textarea
                  className="formTextInput"
                  name="text"
                  id="text"
                  cols="60"
                  rows="20"
                  onChange={handleTextChange}
                ></textarea>
              </label>
            </form>
            <label>
              <button className="formSubmit" onClick={newPostSubmit}>
                Submit
              </button>
            </label>
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

export default NewPost;
