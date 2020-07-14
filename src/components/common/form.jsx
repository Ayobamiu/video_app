import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { currentTarget: input } = event;
    const errors = this.validate();

    this.setState({
      errors: errors || {},
    });
    if (errors) return;
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({
      data,
    });
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({
      data,
      errors,
    });
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  renderInput = (label, name, type = "text") => {
    const { errors, data } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          value={data[name]}
          type={type}
          onChange={this.handleChange}
          className="form-control"
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </div>
    );
  };

  renderSelect = (label, name, options) => {
    const { data, errors } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-control"
          id={name}
          onChange={this.handleChange}
          name={name}
          value={data[name]}
        >
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
          >
        </select>
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </div>
    );
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
