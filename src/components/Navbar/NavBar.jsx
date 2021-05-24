import { useState, useEffect } from "react";
import { isAuthenticated, signout } from "../../API_CALLS/authAPIs";

const NavBar = () => {
  const [buttonText, setButtonText] = useState("Login");

  // if user is logged in, change text to Logout
  useEffect(() => {
    if (isAuthenticated()) {
      setButtonText("Logout");
    }
  }, []);

  // Handler for navbar button
  const logInOrOut = () => {
    if (isAuthenticated()) {
      signout(() => (window.location.href = "/app"));
    } else return (window.location.href = "/");
  };

  return (
    <div className="navbar">
      <h1>Phonebook</h1>
      <button type="button" onClick={logInOrOut}>
        {buttonText}
      </button>
    </div>
  );
};

export default NavBar;
