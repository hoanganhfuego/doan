import React from 'react';
import './Form.css';
import { isEmail } from "validator";
import { Component } from 'react';
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class FormSignup extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            loading: false,
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className='form-content-right'>
        <Form
          className='form'
          onSubmit={this.handleRegister}
          ref={c => {
            this.form = c;
          }}>
          <h1>
            Get fit with us now!
          </h1>
          <div className='form-inputs'>
            <label className='form-label'>Username</label>
            <Input
              className='form-input'
              type='text'
              name='username'
              placeholder='Enter your username'
              value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required, vusername]}
            />
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <Input
              className='form-input'
              type='email'
              name='email'
              placeholder='Enter your email'
              value={this.state.email}
              onChange={this.onChangeEmail}
              validations={[required, email]}
            />
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <Input
              className='form-input'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required, vpassword]}
            />
          </div>

          <button className='form-input-btn'>
            {this.state.loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span> Sign Up</span>
          </button>

          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}

          <CheckButton
            style={{ display: "none" }}
            ref={c => {
              this.checkBtn = c;
            }}
          />
          <span className='form-input-login'>
            Already have an account? Login <a href='/login'>here</a>
          </span>
        </Form>
      </div>
    );
  }
}

export default FormSignup;