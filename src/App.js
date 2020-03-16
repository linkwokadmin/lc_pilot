// import React, { Component } from 'react';
// import { Loading } from './components/common/';
// import Auth from './screens/Auth';
// import LoggedIn from './screens/LoggedIn';
// import deviceStorage from './services/deviceStorage';

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       jwt: '',
//       loading: true
//     }

//     this.newJWT = this.newJWT.bind(this);
//     this.deleteJWT = deviceStorage.deleteJWT.bind(this);
//     this.loadJWT = deviceStorage.loadJWT.bind(this);
//     this.loadJWT();
//   }

//   newJWT(jwt){
//     this.setState({
//       jwt: jwt
//     });
//   }

//   render() {
//     if (this.state.loading) {
//       return (
//         <Loading size={'large'} />
//        );
//     } else if (!this.state.jwt) {
//       return (
//         <Auth newJWT={this.newJWT} />
//       );
//     } else if (this.state.jwt) {
//       return (
//         <LoggedIn jwt={this.state.jwt} deleteJWT={this.deleteJWT} />
//       );
//     }
//   }
// }

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers/index';
// import { config } from './resources/FirebaseSettings';

export default class App extends Component<{}> {
  componentWillMount() {
    // firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}
   