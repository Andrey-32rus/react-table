// src/pages/_app.tsx
import '../styles/App.css'; // Импортируйте глобальные стили здесь
import '../styles/index.css';
import {AppProps} from "next/app";
import Sidebar from "../components/Sidebar";
import store from "../store/store";
import {Provider} from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Sidebar>
                <Component {...pageProps} />
            </Sidebar>
        </Provider>
    );
}

export default MyApp;