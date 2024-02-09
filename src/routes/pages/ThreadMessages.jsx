import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getThreadDetails from "../getRequests/getTheadDetails";
import useMarkAsViewed from "../postRequests/postMarkViewed";
import Moment from "moment";
import addIcon from "../../assets/add.png";
import notViewed from "../../assets/unviewed.png";

const ThreadMessages = ({
  currentUser,
  threadViewed,
  setUserViewed,
  setCurrentTo,
  setTypedUser,
}) => {
  const { threadDetails, error, loading } = getThreadDetails(threadViewed);
  const { attemptMarkAsViewed } = useMarkAsViewed();
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  let friendName;
  let friendID;
  if (threadDetails.messageList[0].from._id !== currentUser._id) {
    friendName = threadDetails.messageList[0].from.username;
    friendID = threadDetails.messageList[0].from._id;
  }
  if (threadDetails.messageList[0].to._id !== currentUser._id) {
    friendName = threadDetails.messageList[0].to.username;
    friendID = threadDetails.messageList[0].to._id;
  }

  function newMessage(e) {
    setCurrentTo(friendName);
    setTypedUser(friendID);
  }

  attemptMarkAsViewed(threadViewed, currentUser._id);
  return (
    <div className="page">
      {currentUser ? (
        <div className="threadPage">
          <div className="threadDetailsPage">
            <h2 className="threadTitle">{friendName} </h2>
            <div className="messageListBox">
              {threadDetails.messageList.map((message, index) => {
                let timestamp = message.timestamp;
                timestamp = Moment(timestamp).format("h:mm: a, MM/DD/YY, ");

                let isCurrentUser = false;
                if (message.from._id === currentUser._id) isCurrentUser = true;

                let className = "messageBox";
                if (isCurrentUser) className = "currentUserMessage";

                let isViewed = false;
                if (message.viewed) isViewed = true;

                function onUserClick(e) {
                  let userID = e.target.className;
                  setUserViewed(userID);
                }

                let isUser = false;
                if (currentUser._id === message.from._id) isUser = true;
                return (
                  <div className={className} key={message._id}>
                    <div className="messageTile">
                      <p>{message.text}</p>
                    </div>
                    <div className="messageLowerBar">
                      <div className="userTile">
                        <button onClick={onUserClick}>
                          {isUser ? (
                            <Link
                              to="/profile"
                              className={message.from._id}
                              id="userLink"
                            >
                              {message.from.username}
                            </Link>
                          ) : (
                            <Link
                              to="/userProfile"
                              className={message.from._id}
                              id="userLink"
                            >
                              {message.from.username}
                            </Link>
                          )}
                        </button>
                      </div>
                      <div className="timeTile">
                        <p>{timestamp}</p>
                      </div>
                      {isViewed ? (
                        <p></p>
                      ) : (
                        <img
                          src={notViewed}
                          alt="message has been viewed"
                          className="addIcon"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={newMessage}>
              <Link className="addButtonBox" to="/newMessage">
                <img
                  src={addIcon}
                  alt="link to send a new message in thread"
                  className="addIcon"
                />
              </Link>
            </button>
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

export default ThreadMessages;
