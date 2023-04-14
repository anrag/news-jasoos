export const config = { amp: true };
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="hi">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="apple-touch-icon"
            href="/favicon-32x32.png"
          ></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
