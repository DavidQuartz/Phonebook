import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../API_CALLS/authAPIs";

// Component to render private Dashboard route for only logged in users
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? ( // if user is loggedIn render component
        <Component {...props} />
      ) : (
        // otherwise redirect to login page
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
