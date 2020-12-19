import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { withStore } from "react-context-hook";
import { history, initialStore } from "./store/store";
import "./App.css";
import Routes from "./Routes";
import { loadUserToStore } from "./auth/authentication";
import NavigationBar from "./container/NavigationBar";

const App = () => {
  useEffect(() => loadUserToStore(), []);
  return (
    <Router history={history}>
      <div className="App">
        <Routes />
        <NavigationBar history={history} />
      </div>
    </Router>
  );
};

export default withStore(App, initialStore);
