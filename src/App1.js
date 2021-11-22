import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";

//demo2: Switch & Route

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="v2">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>React Router V5</p>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
            <hr />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>

              <Route path="/about/" component={About} strict exact />
              <Route
                path="/about/:id"
                render={() => <h2>Render About ID</h2>}
              />

              <Route
                exact
                path="/any/:id"
                render={(routeProps) => {
                  return <AnyComponent {...routeProps} />;
                }}
              />

              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Redirect from="/request" to="/caigou/request" />
            </Switch>
          </div>
        </header>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {

  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
function AnyComponent() {
    let history = useHistory();
    let location = useLocation();
    let { id } = useParams();
    let match = useRouteMatch("/any/:id");
  
    console.log("About页面获取 history ->", history);
    console.log("About页面获取 location ->", location);
    console.log("About页面获取 id ->", id);
    console.log("About页面获取 match ->", match);
  return (
    <div>
      <h2>AnyComponent</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;
