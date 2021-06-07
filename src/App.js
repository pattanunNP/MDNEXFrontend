import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import verifyEmail from "./pages/Verifyemail";
import { PrivateRoute } from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/verify/email" component={verifyEmail}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
