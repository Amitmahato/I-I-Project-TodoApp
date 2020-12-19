import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./container/Dashboard";
import Login from "./container/User/Login";
import EnsureUserComponent from "./container/User/EnsureUserComponent";
import { isAuthenticated } from "./auth/authentication";
import AddEditTask from "./container/Todo/AddTask";

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        rest.render ? (
          rest.render(props)
        ) : (
          <EnsureUserComponent component={component} {...props} />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/addEditTask" component={AddEditTask} />
      <Route exact path="/addEditTask/:id" component={AddEditTask} />
    </Switch>
  );
};

export default Routes;
