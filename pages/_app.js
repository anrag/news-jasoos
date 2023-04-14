import "../styles/globals.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Script from "next/script";
import PushNotificationLayout from "../components/PushNotificationLayout";

function MyApp({ Component, pageProps }) {

  
  return (
    <>
      <meta
        name="google-site-verification"
        content="z3le9-Mv2EjvIW4OUoSgUO7C8jSggdmW-9W3Pyp8FJI"
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YESQE809CB"
        strategy="afterInteractive"
      />
      <script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5DFN9SM');`,
        }}
      ></script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-YESQE809CB');
        `}
      </Script>
      <PushNotificationLayout>
        <Component {...pageProps} />
      </PushNotificationLayout>
    </>
  );
}

export default MyApp;
