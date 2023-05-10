import './App.css';
import Navigation from "./Components/Navigation/Navigation"
import Logo from "./Components/Logo/logo"
import ImageLinkForm from "./Components/ImageLF/imagelf"
import Rank from "./Components/Rank/rank";
import ParticlesBg from 'particles-bg'
import FaceRecognition from './Components/FaceRecognition/faceRecognition'
import SignIn from './Components/SignIn/signIn';
import Register from './Components/Register/register';
import { Component } from 'react';

const setUpClarifai = (imageURL) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '5fd02a8ad1354d438f2b3e9c1c6506ee';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'maxwell';       
    const APP_ID = 'facei';
    // Change these to whatever model and image URL you want to use
    const IMAGE_URL = imageURL;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;
}


    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    const initialState = {
      input: '',
      imageURL: '',
      age: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '', 
        entries: 0,
        joined: new Date()
      }
    };

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }



  calculateLogoLocation = (data) => {
    const clarifaiLogo = data.outputs[0].data.concepts[0];

  return( clarifaiLogo.name);
    }
    

  displayLogoBox = (age) => {
    this.setState({age: age});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}) //The .target.value makes sure you get the value instead of the actual definition of the event.
    console.log(this.state.input)
  }

  onSubmit = () => {

    fetch('http://localhost:8080/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          id: this.state.user.id
      })
  }) 
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}))
    })
    .catch(console.log)

    this.setState({imageURL: this.state.input})

    fetch(`https://api.clarifai.com/v2/models/age-demographics-recognition/versions/fb9f10339ac14e23b8e960e74984401b/outputs`, setUpClarifai(this.state.input))
        .then(response => response.json())
        .then(result => this.displayLogoBox(this.calculateLogoLocation(result)))
        .catch(error => console.log('error', error));

     
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
pm 
  render() {
  const { age, imageURL, route } = this.state;
  return (
    <div className='App'>
    <ParticlesBg type="cobweb" bg={true} />

    { route === 'home'
    ? <div>
    <Navigation onRouteChange={this.onRouteChange}/>
    <Logo/>
    <Rank name={this.state.user.name} entries={this.state.user.entries} />
    <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
    <FaceRecognition age={age} imageURL={imageURL}/>
    </div>
    : (
      route === 'signin'
      ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    )
    }
    </div>
  );
}
}



export default App;
