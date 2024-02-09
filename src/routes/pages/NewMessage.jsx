import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserList from "../getRequests/getAllUsers";
import usePostNewMessage from "../postRequests/postNewMessage";

const NewMessage = ({
  currentUser,
  setThreadViewed,
  currentTo,
  setCurrentTo,
  typedUser,
  setTypedUser,
}) => {
  const [possibleTo, setPossibleTo] = useState([]);
  const [isPossible, setIsPossible] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const navigate = useNavigate();
  const { userList, error, loading } = getUserList();
  const { newMessage, attemptNewMessage } = usePostNewMessage();

  useEffect(() => {
    if (newMessage) {
      setThreadViewed(newMessage);
      navigate("/threadMessages");
    }
  }, [newMessage]);

  useEffect(() => {
    if (userList) {
      if (currentTo.length === 0) {
        setPossibleTo([]);
      } else {
        let current = currentTo.toLowerCase();
        let length = current.length;
        let userObject = [];
        for (let i = 0; i < userList.length; i++) {
          let user = userList[i].username;
          user = String(user);
          user = user.slice(0, length);
          if (user === current)
            userObject.push({
              username: userList[i].username,
              _id: userList[i]._id,
            });
          setPossibleTo(userObject);
        }
      }
    }
  }, [currentTo]);

  useEffect(() => {
    setIsPossible(true);
    setPossibleTo([]);
  }, [typedUser]);

  function newMessageSubmit(e) {
    if (isPossible) attemptNewMessage(currentUser._id, typedUser, currentText);
    setPossibleTo([]);
    setTypedUser("");
    setCurrentTo("");
  }

  function handleToChange(e) {
    setCurrentTo(e.target.value);
  }

  function handleTextChange(e) {
    setCurrentText(e.target.value);
  }

  function selectUser(e) {
    e.preventDefault();
    const user = possibleTo[e.target.className];
    setTypedUser(user._id);
    setCurrentTo(user.username);
  }

  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="page">
      <h1 className="pageTitle">Create Message</h1>

      {currentUser ? (
        <div className="page">
          <div className="newMessageFormBox">
            <form className="newMessageForm">
              <div className="formToBox">
                <label className="formTo">
                  To:
                  <input
                    className="formToInput"
                    type="text"
                    placeholder="username"
                    onChange={handleToChange}
                    value={currentTo}
                  />
                </label>
                <div id="friendOptions">
                  {possibleTo.map((user, index) => {
                    const currentIndex = index;
                    return (
                      <button
                        id="selectedFriend"
                        className={currentIndex}
                        key={user._id}
                        onClick={selectUser}
                      >
                        {user.username}
                      </button>
                    );
                  })}
                </div>
              </div>
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
              <button className="formSubmit" onClick={newMessageSubmit}>
                Submit
              </button>
            </label>
          </div>
        </div>
      ) : (
        <div className="signInMessage">
          <p>Must be Signed In to view this page</p>
          <Link to="/sign-in" className="signInButton">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewMessage;
