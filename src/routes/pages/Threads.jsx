import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getUserThreads from "../getRequests/getUserThreads";
import viewIcon from "../../assets/show.png";

const Threads = ({ currentUser, setThreadViewed, setUserViewed }) => {
  const { userThreads, error, loading } = getUserThreads(currentUser._id);
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="page">
      {currentUser ? (
        <div className="page">
          <h2 className="tableHeader">Your Message Threads</h2>
          <Link to="/newMessage" id="userLink" className="messageButton">
            New Message
          </Link>
          <div className="tableBox">
            <table className="genericTable">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Thread</th>
                </tr>
              </thead>
              <tbody>
                {userThreads.threadList.map((thread, index) => {
                  function onUserClick(e) {
                    let userID = e.target.className;
                    setUserViewed(userID);
                  }

                  function onThreadClick(e) {
                    let threadID = e.target.className;
                    threadID = threadID.slice(12);
                    threadID = userThreads.threadList[threadID]._id;
                    setThreadViewed(threadID);
                  }

                  const threadButtonClass = `threadButton${index}`;
                  let userButtonClass = "";

                  let friendName = "unknown";
                  if (thread.user1._id !== currentUser._id) {
                    friendName = thread.user1.username;
                    userButtonClass = thread.user1._id;
                  }
                  if (thread.user2._id !== currentUser._id) {
                    friendName = thread.user2.username;
                    userButtonClass = thread.user2._id;
                  }

                  return (
                    <tr key={thread._id}>
                      <td>
                        <button onClick={onUserClick}>
                          <Link
                            to="/userProfile"
                            className={userButtonClass}
                            id="userLink"
                          >
                            {friendName}
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button onClick={onThreadClick}>
                          <Link to="/threadMessages">
                            <img
                              src={viewIcon}
                              alt="link to view thread details"
                              id="tableIcon"
                              className={threadButtonClass}
                            />
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default Threads;
