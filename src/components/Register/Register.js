import React from "react";
import face from "./face.png";
import SimpleReactValidator from "simple-react-validator";
import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
    this.validator = new SimpleReactValidator({
      element: message => (
        <div className="red-text text-darken-3">{message}</div>
      )
    });
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignin = () => {
    if (this.validator.allValid()) {
      console.log(this.state);
      fetch("http://192.168.99.100:3000/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
          }
        });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <div className="conatiner">
        <div className="row">
          <div className="col s12 m6">
            <div className="card center-align ">
              <div className="card-content">
                <span className="card-title">Register</span>
                <div className="input-field col s10 m10 offset-m1 offset-s1">
                  <label className="" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={this.onNameChange}
                    className=""
                    type="text"
                    name="name"
                    value={this.state.name}
                    id="name"
                  />
                  {this.validator.message(
                    "name",
                    this.state.name,
                    "required|alpha|min:3"
                  )}
                </div>
                <div className="input-field col s10 m10 offset-m1 offset-s1">
                  <label className="" htmlFor="email">
                    Email
                  </label>
                  <input
                    onChange={this.onEmailChange}
                    className=""
                    type="email"
                    name="email"
                    value={this.state.email}
                    id="email"
                  />
                  {this.validator.message(
                    "email",
                    this.state.email,
                    "required|email"
                  )}
                </div>
                <div className="input-field col s10 m10 offset-m1 offset-s1">
                  <label className="" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordChange}
                    className=""
                    type="password"
                    name="password"
                    value={this.state.password}
                    id="password"
                  />
                  {this.validator.message(
                    "password",
                    this.state.password,
                    "required|alpha_num_dash_space|min:6"
                  )}
                </div>

                <div className="center-align">
                  <button
                    onClick={this.onSubmitSignin}
                    className="waves-effect waves-light btn green accent-3"
                  >
                    Register
                  </button>
                </div>
                <br />

                <div className="center-align">
                  <button
                    onClick={() => onRouteChange("signin")}
                    className="waves-effect waves-light btn orange darken-3"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col s6 m6 center-align hide-on-small-only signImg">
            <img src={face} alt="face" width="450px" height="auto" />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
