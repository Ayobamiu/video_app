import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import ResgisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar user={user} />
        <ToastContainer />
        <div>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={ResgisterForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies/new" component={MovieForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/addMovie" component={Movies} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
