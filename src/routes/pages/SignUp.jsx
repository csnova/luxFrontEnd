import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostSignUp from "../postRequests/postSignUp";

const SignUp = ({ setUserToken, currentUser, setCurrentUser }) => {
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentConfirmPassword, setCurrentConfirmPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState("");
  const navigate = useNavigate();
  const { loading, attemptSignUp, signUp, error } = usePostSignUp();

  function signUpSubmit(e) {
    attemptSignUp(
      currentFirstName,
      currentLastName,
      currentEmail,
      currentUsername,
      currentPassword,
      currentConfirmPassword
    );
  }

  useEffect(() => {
    if (signUp) {
      if (!signUp.user) {
        setLoginErrors(
          "There was an error with sign in. Check Values and Try Again."
        );
      } else {
        setLoginErrors("");
        localStorage.setItem("userToken", signUp.token);
        setUserToken(signUp.token);
        localStorage.setItem("userDetails", JSON.stringify(signUp.user));
        setCurrentUser(signUp.user);
        navigate("/");
      }
    }
  }, [signUp]);

  function handleFirstNameChange(e) {
    setCurrentFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setCurrentLastName(e.target.value);
  }

  function handleUsernameChange(e) {
    setCurrentUsername(e.target.value);
  }

  function handleEmailChange(e) {
    setCurrentEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setCurrentPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setCurrentConfirmPassword(e.target.value);
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
            <h2>Contact Info</h2>
            <label>
              First Name:
              <input type="text" onChange={handleFirstNameChange} required />
            </label>
            <label>
              Last Name:
              <input type="text" onChange={handleLastNameChange} required />
            </label>
            <label>
              Email:
              <input type="email" onChange={handleEmailChange} required />
            </label>
            <br />
            <h2>Login Info</h2>
            <label>
              Username:
              <input
                type="text"
                onChange={handleUsernameChange}
                placeholder="Must be at least 4 characters"
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                onChange={handlePasswordChange}
                placeholder="Must be at least 8 characters"
                required
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                onChange={handleConfirmPasswordChange}
                placeholder="Passwords must match"
                required
              />
            </label>
          </form>
          <button className="formSubmit" onClick={signUpSubmit}>
            Submit
          </button>
          <h3>{loginErrors}</h3>
          <div className="alreadySignedIn">
            <p>Already Have an Account?</p>
            <div className="buttonBox">
              <Link to="/sign-In" className="signOutButton">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
