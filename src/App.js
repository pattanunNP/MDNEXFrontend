import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { PrivateRoute } from "./components/Router/PrivateRoute";
import LoadingScreen from "./components/objects/LoadingScreen";

import "./App.css";

const Home = lazy(() => import("./pages/PublicPages/Home"));
const Terms = lazy(() => import("./pages/PublicPages/Terms"));
const Login = lazy(() => import("./pages/PublicPages/Login"));
const Register = lazy(() => import("./pages/PublicPages/Register"));
const Dashboard = lazy(() => import("./pages/UserPages/Dashboard"));
const Data = lazy(() => import("./pages/UserPages/Data"));
const NewData = lazy(() => import("./pages/UserPages/NewDataset"));
const VerifyEmail = lazy(() => import("./pages/UserPages/Verifyemail"));
const NotFound = lazy(() => import("./pages/PublicPages/NotFround"));

function App() {
  return (
    <div style={{ fontFamily: "Kanit" }}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route exact path={ROUTES.TERMS} component={Terms} />
            <Route exact path={ROUTES.LOGIN} component={Login} />
            <Route exact path={ROUTES.REGISTER} component={Register} />
            <Route exact path={ROUTES.VERIFY_EMAIL} component={VerifyEmail} />
            <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <PrivateRoute exact path={ROUTES.DATA} component={Data} />
            <PrivateRoute exact path={ROUTES.NEW_DATA} component={NewData} />

            <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
