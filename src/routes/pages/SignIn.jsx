import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostSignIn from "../postRequests/postSignIn";

const SignIn = ({ setUserToken, currentUser, setCurrentUser }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState("");
  const navigate = useNavigate();
  const { attemptLogin, signIn } = usePostSignIn();
  function signInSubmit(e) {
    attemptLogin(currentUsername, currentPassword);
  }

  useEffect(() => {
    if (signIn) {
      if (!signIn.user) {
        setLoginErrors(
          "There was an error with login, check username and password and try again"
        );
      } else {
        setLoginErrors("");
        localStorage.setItem("userToken", signIn.token);
        setUserToken(signIn.token);
        localStorage.setItem("userDetails", JSON.stringify(signIn.user));
        setCurrentUser(signIn.user);
        navigate("/");
      }
    }
  }, [signIn]);

  function handleUsernameChange(e) {
    setCurrentUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setCurrentPassword(e.target.value);
  }
  return (
    <div className="page">
      <h1 className="pageTitle">Sign-In</h1>

      {currentUser ? (
        <div className="alreadySignedIn">
          <p>You are already Signed in!</p>
          <div className="buttonBox">
            <Link to="/sign-out" className="signOutButton">
              Sign Out
            </Link>
            <Link to="/profile" className="profileButton">
              Profile
            </Link>
          </div>
        </div>
      ) : (
        <div className="signInFormBox">
          <form className="signInForm">
            <label>
              Username:
              <input type="text" onChange={handleUsernameChange} />
            </label>
            <label>
              Password:
              <input type="password" onChange={handlePasswordChange} />
            </label>
          </form>
          <button className="formSubmit" onClick={signInSubmit}>
            Submit
          </button>
          <h3>{loginErrors}</h3>
        </div>
      )}
    </div>
  );
};

export default SignIn;
