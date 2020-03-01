import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App/App';
import { ServiceWorker } from './ServiceWorker';

ReactDOM.render(
    <>
        <App />
        <ServiceWorker />
    </>,
    document.getElementById('root'),
);
