
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/ForumComponents/theme';

ReactDOM.render(

    <HashRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </HashRouter>,

    document.getElementById('root')
);

