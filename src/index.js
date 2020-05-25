// import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import initStore from './config/store.ts';
import setupAxiosInterceptors from './config/axios-interceptor.ts';

setupAxiosInterceptors(() => console.log('error'));
const store = initStore();

const render = Component =>
  ReactDOM.render(
    <>
        <Provider store={store}>
            <div>
            <Component />
            </div>
        </Provider>
    </>
    ,
    document.getElementById("root")
  );

render(App);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
