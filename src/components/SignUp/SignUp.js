import React, { Component } from "react";
import { withRouter } from "react-router";

import { signUp, signIn } from "../../api/auth";
import messages from "../AutoDismissAlert/messages";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import setAuthToken from "../../setAuthToken";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
    };
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  onSignUp = (event) => {
    event.preventDefault();

    const { msgAlert, history, setUser } = this.props;

    signUp(this.state)
      .then(() => {
        signIn(this.state)
        .then((res) => {
        setUser(res.data.user);
                localStorage.setItem("token", res.data.user.token);
                setAuthToken(localStorage.token);
  })})
      // .then((res) => setUser(res.data.user))
      .then(() =>
        msgAlert({
          heading: "Sign Up Success",
          message: messages.signUpSuccess,
          variant: "success",
        })
      )
      .then(() => history.push("/"))
      .catch((error) => {
        this.setState({
          email: "",
          password: "",
          passwordConfirmation: "",
          name: "",
        });
        msgAlert({
          heading: "Sign Up Failed with error: " + error.message,
          message: messages.signUpFailure,
          variant: "danger",
        });
      });
  };

  render() {
    const { email, password, passwordConfirmation, name } = this.state;

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Your Trainer name</Form.Label>
              <Form.Control
                required
                name="name"
                value={name}
                type="string"
                placeholder="Trainer name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
