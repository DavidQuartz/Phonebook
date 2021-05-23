import { useState, useEffect } from "react";
import { isAuthenticated, signout } from "../../API_CALLS/authAPIs";

const NavBar = () => {
  const [buttonText, setButtonText] = useState("Login");

  useEffect(() => {
    if (isAuthenticated()) {
      setButtonText("Logout");
    }
  }, []);

  // Handler for navbar button
  const logInOrOut = () => {
    if (isAuthenticated()) {
      signout(() => (window.location.href = "/app"));
    }
    return false;
  };

  return (
    <div className="navbar">
      <h1>Phonebook</h1>
      <button onClick={logInOrOut}>{buttonText}</button>
    </div>
  );
};

export default NavBar;
