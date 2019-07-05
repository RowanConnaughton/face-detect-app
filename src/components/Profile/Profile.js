import React from "react";
import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age
    };
  }

  onFormChange = event => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;

      default:
        return;
    }
  };

  onProfileUpdate = data => {
    fetch(`http://192.168.99.100:3000/profile/${this.props.user.id}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({ formInput: data })
    })
      .then(resp => {
        if (resp.status === 200 || resp.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch(console.log);
  };

  render() {
    const { user, toggleModal } = this.props;
    const { name, age } = this.state;

    return (
      <div className="conatiner profile-modal">
        <div className="row">
          <div className="col s12 ">
            <div className="card center-align ">
              <div className="card-content">
                <div className="modal-close" onClick={toggleModal}>
                  &times;
                </div>
                <h3>{user.name}</h3>
                <h4>{`Age: ${user.age}`}</h4>
                <h4>{`Images Submitted: ${user.entries}`}</h4>
                <p>{`Member since: ${new Date(
                  user.joined
                ).toLocaleDateString()}`}</p>

                <div className="input-field col s10 m10 offset-m1 offset-s1">
                  <label className="" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={this.onFormChange}
                    type="text"
                    name="user-name"
                    id="name"
                  />
                </div>
                <div className="input-field col s10 m10 offset-m1 offset-s1">
                  <label className="" htmlFor="age">
                    Age
                  </label>
                  <input
                    onChange={this.onFormChange}
                    type="text"
                    name="user-age"
                    id="age"
                  />
                </div>

                <div className="center-align">
                  <button
                    onClick={() => this.onProfileUpdate({ name, age })}
                    className="waves-effect waves-light btn green accent-3"
                  >
                    Save
                  </button>
                </div>
                <br />

                <div className="center-align">
                  <button
                    onClick={toggleModal}
                    className="waves-effect waves-light btn orange darken-3"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
