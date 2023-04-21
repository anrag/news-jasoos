import "../styles/globals.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Script from "next/script";
import { endPoint } from "../utils/utils";
import Link from "next/link";

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
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-1621029292135466"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
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
      <Component {...pageProps} />
      <footer className="bg-white  shadow  dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href={endPoint} className="hover:underline">
              News Jasoos™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link href={"/aboutus"} className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
