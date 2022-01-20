# Face Detection App

View the app [here](https://face-detection-app-rc.herokuapp.com/)

The live version hosted on heroku does not have session storage, profile modal or rank badges.

This app was created with Reactjs and materializecss.

The app uses postgres database to store user info.

Clarafi API to detect faces in images.

Redis for session storeage of JWT tokens.

The app also uses AWS lambda to handle rank badges in the form of emojis.

Other libraries used:
[react-tilt](https://www.npmjs.com/package/react-tilt)
[react-particles-js](https://www.npmjs.com/package/react-particles-js)
[simple-react-validator](https://www.npmjs.com/package/simple-react-validator)

## Setup

clone repo

npm install

npm start to run on local host

You can find the backend github repository [here](https://github.com/RowanConnaughton/face-detect-api)
