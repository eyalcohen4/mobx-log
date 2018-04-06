import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Log from './Log';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<App log={Log} />, document.getElementById('root'));
registerServiceWorker();
