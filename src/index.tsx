import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {setupStore} from './store/store'
import './index.css';
import App from './App';

const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// ReactDOM.createRoot(document.getElementById("root")).render(<App />);


