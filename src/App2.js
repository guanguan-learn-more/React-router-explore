import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import Home from "./pages/home";
import About from "./pages/about";
import Dashboard from "./pages/dashborad";

// demo3: 路由懒加载
function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      debugger;

      this.setState({
        component: component,
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

const HomeAsync = lazy(() =>
  import(/* webpackChunkName: 'Home'*/ "./pages/home")
);
const AboutAsync = lazy(() =>
  import(/* webpackChunkName: 'About'*/ "./pages/about")
);
const DashBoradAsync = lazy(() =>
  import(/* webpackChunkName: 'Dashboard'*/ "./pages/dashborad")
);

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
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
            <hr />
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/" exact component={HomeAsync} />
                <Route path="/about" component={AboutAsync} />
                <Route path="/dashboard" component={DashBoradAsync} />

                {/* <Route path="/" exact component={Home} />
                <Route path="/about" component={About}/>
                <Route path="/dashboard" component={Dashboard}/> */}
              </Switch>
            </Suspense>
          </div>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
