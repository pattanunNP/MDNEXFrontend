import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { PrivateRoute } from "./components/PrivateRoute";
import LoadingScreen from "./components/LoadingScreen";

import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Terms = lazy(() => import("./pages/Terms"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const VerifyEmail = lazy(() => import("./pages/Verifyemail"));
// const NotFound = lazy(() => import("./pages/NotFround"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home}></Route>
          <Route exact path={ROUTES.TERMS} component={Terms}></Route>
          <Route exact path={ROUTES.LOGIN} component={Login}></Route>
          <Route exact path={ROUTES.REGISTER} component={Register}></Route>
          {/* <Route exact path={ROUTES.NOT_FOUND} component={NotFound}></Route> */}
          <Route
            exact
            path={ROUTES.VERIFY_EMAIL}
            component={VerifyEmail}
          ></Route>
          <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
