import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import '../styles/index.css';
import '../styles/styles.css';
import {AppProps} from "next/app";
import Sidebar from "../components/Sidebar";
import store from "../store/store";
import {Provider} from "react-redux";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>React Table</title>
          </Head>
          <Sidebar>
                <Component {...pageProps} />
          </Sidebar>
        </Provider>
      </SessionProvider>
    );
}

export default MyApp;