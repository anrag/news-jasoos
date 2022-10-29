import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import client from "./api/graphql-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
