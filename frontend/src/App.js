import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RegisterComponent from "./components/RegisterComponent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import AdminRegisterComponent from "./components/AdminRegisterComponent";
import AdminLoginComponent from "./components/AdminLoginComponent";
import UserDashboardComponent from "./components/UserDashboardComponent";
import AdminDashboardComponent from "./components/AdminDashboardComponent";
import AddComplaintComponent from "./components/AddComplaintComponent";

function App() {
  let is_admin = localStorage.getItem('user_logged_in') == "admin"
  const logout = () => {
    localStorage.setItem('user_logged_in', '0')
    localStorage.setItem('user_id', '0')
    window.location.href = "/sign-in"
  }
  return (
    <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Complaints System</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            { localStorage.getItem('user_logged_in') != '0'?
                <ul className="navbar-nav ml-auto">
                {is_admin?
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>All Complaints</Link>
                  </li>
                  :<li className="nav-item">
                    <Link className="nav-link" to={"/add-complaint"}>Add Complaint</Link>
                  </li>
                }
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>Logout</button>
                </li>
              </ul>
              :<ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin-sign-up"}>Admin Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin-sign-in"}>Admin Sign in</Link>
              </li>
            </ul> }
          </div>
        </div>
      </nav>

      <div className="box-wrapper">
        <div className="box-inner">
          <Switch>
            <Route exact path='/sign-up' component={RegisterComponent} />
            <Route exact path='/sign-in' component={LoginComponent} />
            <Route exact path='/admin-sign-up' component={AdminRegisterComponent} />
            <Route exact path='/admin-sign-in' component={AdminLoginComponent} />
            <Route exact path='/user-dashboard' component={UserDashboardComponent} />
            <Route exact path='/admin-dashboard' component={AdminDashboardComponent} />
            <Route exact path='/add-complaint' component={AddComplaintComponent} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
