import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';


import './App.css';




const particlesOptions = {

  "particles": {
    "number": {
      "value": "50",
      "density": {
        "enable": "true",
        "value_area": "300"
      }
    },
    "size": {
      "value": "3"
    }
  }



}

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {

    let res = [];


    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    for (let reg of data.outputs[0].data.regions) {

      res.push({
        topRow: height * reg.region_info.bounding_box.top_row,
        bottomRow: height - height * reg.region_info.bounding_box.bottom_row,
        leftCol: width * reg.region_info.bounding_box.left_col,
        rightCol: width - width * reg.region_info.bounding_box.right_col
      });
    }

    return res;

  }

  displayFaceBox = (box) => {

    this.setState({ box: box });

  }

  onInputChange = (event) => {

    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {

    this.setState({ imageUrl: this.state.input });

    fetch('https://frozen-wildwood-90414.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://frozen-wildwood-90414.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));

  }

  onRouteChange = (route) => {

    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route });
  }

  render() {

    const { isSignedIn, imageUrl, route, box } = this.state;

    return (

      <div className="App">

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ?
          <div>
            <Particles className="particles"
              params={particlesOptions} />
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>

          : (route === 'signin'
            ?
            <div>
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

            </div>
            :

            <div>
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

            </div>

          )




        }

      </div>
    );
  }
}

export default App;
