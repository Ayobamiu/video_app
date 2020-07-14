import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "./../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;
    try {
      await auth.login(username, password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({
          errors,
        });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="jumbotron" style={{ margin: "20px 25% 50% 25%" }}>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username")}
          {this.renderInput("Password", "password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
