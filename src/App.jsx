import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import PrivateRoute from "./components/Utilities/PrivateRoute";
import ContactsContextProvider from "./ContactsContext/ContactsContext";
import NoPageFound from "./Pages/NoPageFound/NoPageFound";

const Login = lazy(() => import("./Pages/Auth/LoginPage"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));

const App = () => {
  return (
    <Router>
      <Switch>
        <Suspense
          fallback={
            <div className="phonebook-preloader-wrapper">
              <div className="phonebook-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <ContactsContextProvider>
            <Navbar />
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/app" component={Dashboard} />
          </ContactsContextProvider>
          <Route exact path="/404" component={NoPageFound} />
          <Redirect to="/404" />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default App;
