import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { PrivateRoute } from "./components/Router/PrivateRoute";
import LoadingScreen from "./components/objects/LoadingScreen";
import * as Sentry from "@sentry/react";
// Public Page
const Home = lazy(() => import("./pages/PublicPages/Home"));
const Terms = lazy(() => import("./pages/PublicPages/Terms"));
const Login = lazy(() => import("./pages/PublicPages/Login"));
const Register = lazy(() => import("./pages/PublicPages/Register"));
const VerifyEmail = lazy(() => import("./pages/PublicPages/Verifyemail"));
const NotFound = lazy(() => import("./pages/PublicPages/NotFround"));

//Private Page
const Dashboard = lazy(() =>
  import("./pages/UserPages/DashboardPage/Dashboard")
);
const Labeltool = lazy(() =>
  import("./pages/UserPages/DashboardPage/Labeltool")
);

const Setting = lazy(() =>
  import("./pages/UserPages/DashboardPage/Setting"))

// Page
const ProjectPage = lazy(() => import("./pages/UserPages/Page/ProjectPage"));
const DatasetPage = lazy(() => import("./pages/UserPages/Page/DatasetPage"));
const UserProfilePage = lazy(() => import("./pages/UserPages/Page/UserProfilePage"))
// new
const NewData = lazy(() => import("./pages/UserPages/NewPage/NewDataset"));
const NewProjects = lazy(() => import("./pages/UserPages/NewPage/NewProjects"));
const NewTeams = lazy(() => import("./pages/UserPages/NewPage/NewTeam"));

// manange
const ManangeProjects = lazy(() =>
  import("./pages/UserPages/ManangePage/ManangeProjects")
);
const ManangeTeams = lazy(() =>
  import("./pages/UserPages/ManangePage/ManangeTeams")
);
const ManangeData = lazy(() =>
  import("./pages/UserPages/ManangePage/ManangeDataset")
);

function App() {
  return (

    <Sentry.ErrorBoundary fallback={"An error has occurred"}>
      <div style={{ fontFamily: "Kanit" }}>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <Switch>
              <Route exact path={ROUTES.HOME} component={Home} />
              <Route exact path={ROUTES.TERMS} component={Terms} />
              <Route exact path={ROUTES.LOGIN} component={Login} />
              <Route exact path={ROUTES.REGISTER} component={Register} />
              <Route exact path={ROUTES.VERIFY_EMAIL} component={VerifyEmail} />

              <PrivateRoute
                exact
                path={ROUTES.DASHBOARD}
                component={Dashboard}
              />

              <PrivateRoute
                exact
                path={ROUTES.SETTING}
                component={Setting}
              />

              <PrivateRoute
                exact
                path={ROUTES.PROJECT}
                component={ProjectPage}
              />
              <PrivateRoute
                exact
                path={ROUTES.DATA_PAGE}
                component={DatasetPage}
              />
              <PrivateRoute
                exact
                path={ROUTES.PROFILE}
                component={UserProfilePage}
              />
              <PrivateRoute
                exact
                path={ROUTES.MANAGE_DATASET}
                component={ManangeData}
              />
              <PrivateRoute exact path={ROUTES.NEW_DATA} component={NewData} />
              <PrivateRoute
                exact
                path={ROUTES.MANAGE_PROJECTS}
                component={ManangeProjects}
              />
              <PrivateRoute
                exact
                path={ROUTES.MANAGE_TEAMS}
                component={ManangeTeams}
              />
              <PrivateRoute
                exact
                path={ROUTES.LABEL_TOOL}
                component={Labeltool}
              />
              <PrivateRoute
                exact
                path={ROUTES.NEW_PROJECTS}
                component={NewProjects}
              />
              <PrivateRoute exact path={ROUTES.NEW_TEAM} component={NewTeams} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </Sentry.ErrorBoundary>

  );
}

export default App;
