import { useState, useContext } from "react";
import { ContactsContext } from "../../ContactsContext/ContactsContext";
import ShowError from "../Utilities/ShowError";
import LoadingButton from "../Utilities/LoadingButton";

import { login, authenticate, isAuthenticated } from "../../API_CALLS/authAPIs";

const AuthCard = () => {
  (function redirectUser() {
    if (isAuthenticated()) {
      return (window.location.href = "/app");
    }
  })();

  let { utils, dispatch } = useContext(ContactsContext);

  const [userInput, setUserInput] = useState({
    email: "quartzdavid@gmail.com",
    password: "reacted123",
  });

  const { email, password } = userInput;
  const { error, loading } = utils;

  const signin = (info) => {
    dispatch({ type: "UPDATE_LOADING", loading: true });
    dispatch({ type: "UPDATE_ERROR", error: "" });

    login(info).then((data) => {
      if (!data) {
        dispatch({ type: "UPDATE_LOADING", loading: false });
        dispatch({
          type: "UPDATE_ERROR",
          error:
            "Oops! We were unable to establish a connection to the server. Try again later.",
        });
        return;
      }

      if (data.code) {
        dispatch({ type: "UPDATE_LOADING", loading: false });
        dispatch({
          type: "UPDATE_ERROR",
          error: data.message,
        });

        return;
      }
      // if sign in is successful
      dispatch({ type: "UPDATE_LOADING", loading: false });
      dispatch({
        type: "UPDATE_ERROR",
        error: false,
      });

      setUserInput({
        email: "",
        password: "",
      });

      authenticate(data, () => {
        return (window.location.href = "/app");
      });
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({ type: "UPDATE_LOADING", loading: false });
    dispatch({
      type: "UPDATE_ERROR",
      error: false,
    });
    setUserInput({ ...userInput, [name]: value });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_LOADING", loading: false });
    dispatch({
      type: "UPDATE_ERROR",
      error: false,
    });
    signin(userInput);
  };

  return (
    <div className="container card auth-card">
      <h1>Welcome to Phonebook!</h1>
      {error && <ShowError error={error} />}
      <form onSubmit={handleLoginClick}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label> <br />
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            placeholder="Enter Email Address"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Password</label> <br />
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            placeholder="Enter Your Password"
            className="form-control"
          />
        </div>
        {loading ? (
          <LoadingButton className="btn btn-primary" />
        ) : (
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default AuthCard;
