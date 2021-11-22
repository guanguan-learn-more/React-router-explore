import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";

//Demo1: HashRouter & BrowserRouter

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

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
            </ul>
            <hr />
            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
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

export default App;
