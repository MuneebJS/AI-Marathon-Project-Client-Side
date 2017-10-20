import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import Routes from './routes'
import registerServiceWorker from './registerServiceWorker';
// import './index.css';
// import { Provider } from "react-redux"
// import { store } from './store/index'
// import * as firebase from 'firebase';
// import { BrowserRouter } from 'react-router-dom'
import Main from './App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// var config = {
//     apiKey: "AIzaSyB92CLMSaw4djN_lP7cciwrI-xLbvAaf-0",
//     authDomain: "image-slider-5d94d.firebaseapp.com",
//     databaseURL: "https://image-slider-5d94d.firebaseio.com",
//     projectId: "image-slider-5d94d",
//     storageBucket: "image-slider-5d94d.appspot.com",
//     messagingSenderId: "925511370275"
// };
// firebase.initializeApp(config);

const App = () => (
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  );

ReactDOM.render(
    // <Provider store={store}>
    //     <BrowserRouter>
    //         <Routes />
    //     </BrowserRouter>
    // </Provider>,
    <App />,
    document.getElementById('root'));
registerServiceWorker();
