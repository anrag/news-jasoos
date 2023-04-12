import "../styles/globals.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Script from "next/script";

function MyApp({ Component, pageProps }) {

  
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PLWLTD0PEE');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
