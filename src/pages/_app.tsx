import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import '../styles/index.css';
import '../styles/styles.css';
import {AppProps} from "next/app";
import Sidebar from "../components/Sidebar";
import store from "../store/store";
import {Provider} from "react-redux";
import Head from "next/head";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";

type PageProps = {
  session: Session | null;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "React Table",
  "url": "https://react-table.ru",
};

function MyApp({Component, pageProps}: AppProps<PageProps>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>Результаты игр — таблицы и статистика для всех популярных игр</title>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </Head>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;