import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import likeIcon from "../../assets/like.png";
import editIcon from "../../assets/edit.png";
import getUserDetails from "../getRequests/getUserDetails";
import getUserPicture from "../getRequests/getUserPicture";
import { useNavigate } from "react-router-dom";
import Moment from "moment";

const Profile = ({
  currentUser,
  setUserViewed,
  setPostViewed,
  setTypedUser,
}) => {
  const { userDetails, error, loading } = getUserDetails(currentUser._id);
  const { userPicture, error1, loading1 } = getUserPicture(currentUser._id);

  const navigate = useNavigate();

  function setUserId(e) {
    let userID = e.target.className;
    setUserViewed(userID);
    setTypedUser("");
  }

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

  if (error || error1) return <p>A Network Error has occurred. </p>;
  if (loading || loading1) return <p>Loading...</p>;

  return (
    <div className="page">
      {currentUser ? (
        <div className="profilePage">
          <div className="profileSideBar">
            <div className="userBox">
              <h2 className="userName">
                {userDetails.profile[0].user.username}
              </h2>
              <div className="pictureBox">
                <img
                  className="profilePicture"
                  src={userPicture}
                  alt="Profile Picture"
                />
                <Link to="/updatePicture">
                    <img
                      src={editIcon}
                      alt="edit"
                      className="editIcon"
                    />
                  </Link>
              </div>
              <div className="userInfo">
                <h3 className="profileName">
                  {userDetails.profile[0].first_name}{" "}
                  {userDetails.profile[0].last_name}
                  <Link to="/updateProfile">
                    <img
                      src={editIcon}
                      alt="edit"
                      className="editIcon profileIcon"
                    />
                  </Link>
                </h3>

                <div className="bioBox">
                  <p className="bioTitle">Bio: </p>
                  <p className="bioText">{userDetails.profile[0].bio}</p>
                </div>
              </div>
            </div>
            <br />
            <div className="followingBox">
              <h3 className="followingTitle">User is Following</h3>
              <div className="followingList">
                {userDetails.following.length ? (
                  <>
                    {userDetails.following.map((user, index) => {
                      return (
                        <button
                          onClick={setUserId}
                          id="profileButton"
                          key={user._id}
                        >
                          <Link
                            to="/userProfile"
                            className={user._id}
                            id="profileLink"
                          >
                            {user.username}
                          </Link>
                        </button>
                      );
                    })}
                  </>
                ) : (
                  <p>No Users</p>
                )}
              </div>
            </div>
            <br />
            <div className="followersBox">
              <h3 className="followersTitle">User's Followers</h3>
              <div className="followersList">
                {userDetails.followed.length ? (
                  <>
                    {userDetails.followed.map((user, index) => {
                      return (
                        <button
                          onClick={setUserId}
                          id="profileButton"
                          key={user._id}
                        >
                          <Link
                            to="/userProfile"
                            className={user._id}
                            id="profileLink"
                          >
                            {user.username}
                          </Link>
                        </button>
                      );
                    })}
                  </>
                ) : (
                  <p>No Users</p>
                )}
              </div>
            </div>
          </div>
          <div className="profileNewsFeed">
            <h2>Posts</h2>
            {userDetails.posts.length ? (
              <>
                {userDetails.posts.map((post, index) => {
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
                            id="userLinkNoHover"
                            className={post.user._id}
                          >
                            <p id="postUser" className={post.user._id}>
                              {currentUser.username}
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
              </>
            ) : (
              <div className="postBox">
                <p className="noPosts">No Posts</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="signInMessage">
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

export default Profile;
