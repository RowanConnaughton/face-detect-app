import React from 'react';
import light from './light.png';
import SimpleReactValidator from 'simple-react-validator';


class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
        this.validator = new SimpleReactValidator({
            element: message => <div className='red-text text-darken-3'>{message}</div>
        });
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    onSubmitSignin = () => {

        console.log(this.signInEmail)

        if (this.validator.allValid()) {

            fetch('https://frozen-wildwood-90414.herokuapp.com/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })

            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }
                })

        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }





    }

    render() {

        const { onRouteChange } = this.props;

        return (

            <div className="conatiner">

                <div className="row">
                    <div className="col s12 m6">
                        <div className="card center-align ">
                            <div className="card-content">
                                <span className="card-title">Sign In</span>
                                <div className="input-field col s10 m10 offset-m1 offset-s1">
                                    <label className="" htmlFor="email">Email</label>
                                    <input
                                        onChange={this.onEmailChange}
                                        className=""
                                        type="email"
                                        name="email"
                                        value={this.state.signInEmail}
                                        id="email-address" />

                                    {/* validation */}
                                    {this.validator.message('email', this.state.signInEmail, 'required|email')}
                                </div>
                                <div className="input-field col s10 m10 offset-m1 offset-s1">
                                    <label className="" htmlFor="password">Password</label>
                                    <input
                                        onChange={this.onPasswordChange}
                                        className=""
                                        type="password"
                                        name="password"
                                        value={this.state.signInPassword}
                                        id="password" />

                                    {/* validation */}
                                    {this.validator.message('password', this.state.signInPassword, 'required|alpha_num_dash_space|min:6')}
                                </div>


                                <div className="center-align">
                                    <button onClick={this.onSubmitSignin} className="waves-effect waves-light btn green accent-3" type="submit" value="Sign in">Sign In</button>
                                </div>
                                <br />
                                <div className="center-align">
                                    <button onClick={() => onRouteChange('register')} className="waves-effect waves-light btn orange darken-3">Register</button>

                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="col s6 m6 center-align hide-on-small-only signImg">
                        <img src={light} alt="light" width='450px' height="auto" />
                    </div>
                </div>
            </div>

        );

    }

}

export default Signin;