import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"/>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <meta name="apple-mobile-web-app-title" content="React Table"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
          <meta name="apple-mobile-web-app-title" content="React Table"/>
          <meta charSet="utf-8"/>
          <meta name="theme-color" content="#000000"/>
          <meta
            name="description"
            content="web site for game table"
          />
          <meta name="keywords" content="table, game, react, pwa"/>
          <meta name="author" content="AS"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;