import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import '../styles/index.css';
import {AppProps} from "next/app";
import Sidebar from "../components/Sidebar";
import store from "../store/store";
import {Provider} from "react-redux";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>React Table</title>
          </Head>
          <Sidebar>
                <Component {...pageProps} />
            </Sidebar>
        </Provider>
    );
}

export default MyApp;