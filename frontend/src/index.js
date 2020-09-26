import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles.css';
import App from './App';
import Form from './Form';

ReactDOM.render( < React.StrictMode >
    <App / >
        <Form/>
    </React.StrictMode>,
    document.getElementById('root')
);
