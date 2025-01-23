// src/pages/index.tsx
import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from '../store/store'

const IndexPage: React.FC = () => {
    useEffect(() => {
        // Этот код будет выполнен только на клиенте
    }, []);

    return (
        <Provider store={store}>  {/* Подключаем Redux */}
            <HashRouter>  {/* HashRouter для маршрутизации */}
                <App />  {/* Подключаем основной компонент */}
            </HashRouter>
        </Provider>
    );
};

export default IndexPage;