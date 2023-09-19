import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './GlobalStyle/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/font_awesome_6_pro/css/all.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </Provider>
    </React.StrictMode>,
);
reportWebVitals();
