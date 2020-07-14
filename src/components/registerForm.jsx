import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "./../services/userService";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    const { data: user } = this.state;
    try {
      const response = await register(user);
      loginWithJwt(response.headers["x-auth-token"])
      window.location = "/";

      console.log(response);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({
          errors,
        });
      }
    }

    // const users = { ...this.state.users, newUser };
    // this.setState({
    //   users,
    // });
  };

  render() {
    return (
      <div className="jumbotron" style={{ margin: "20px 25% 50% 25%" }}>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username")}
          {this.renderInput("Password", "password", "password")}
          {this.renderInput("Name", "name")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
