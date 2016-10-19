import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger())(createStore);

class App extends Component {
	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyB1K56AP4LzmxkYpg1qPq2CfhM0HPiZQlo',
			authDomain: 'manager-cb77a.firebaseapp.com',
			databaseURL: 'https://manager-cb77a.firebaseio.com',
			storageBucket: 'manager-cb77a.appspot.com',
			messagingSenderId: '1037526763592'
		};

		firebase.initializeApp(config);
	}

	render() {
		return (
			<Provider store={createStoreWithMiddleware(reducers)}>
				<Router />
			</Provider>
		);
	}
}

export default App;
