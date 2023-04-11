// export const config = { amp: true };
import SideNavbar from "../components/SideNavbar";
import {React, memo, useEffect, useState} from 'react';
import { gql } from "@apollo/client";
import client from "./api/graphql-client";
import Image from "next/image";
import { Button, Tag } from "antd";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { share } from "../components/Share";
import Script from "next/script";
import  Axios  from "axios";
const NewsList = ({}) => {
  const [results,setResults] = useState(null);

  const getInitalData = async () => {
    const getDAta = await Axios.get("http://localhost:3000/api/hello");
    setResults(getDAta.data.data)
  }
  useEffect(() => {
    getInitalData();
  },[])
  const router = useRouter()

  return (
    <>
      <Script
        type="text/javascript"
        src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-636029ee664af571"
      ></Script>
      {router.pathname == "/" && (
        <Head>
          <link rel="manifest" href="/manifest.json" />

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1621029292135466"
            crossOrigin="anonymous"
          ></script>
          <meta
            name="description"
            content="News Site about crime and bollywood news coverrage"
          />
          <title>
            News Jasoos - News Site about crime and bollywood news coverrage
          </title>
          <meta
            name="twitter:description"
            content="News in Hindi ( प्रदेश समाचार) - Read latest MP Hindi news (मध्य प्रदेश न्यूज़), MP local news in Hindi, MP breaking news &amp; updates, MP news headlines with Hindi News Paper exclusively from News Jasoos."
          />
          <meta
            name="title"
            content="News Jasoos - hindi news, crime News, Bollywood Latest news in Hindi"
          />
          <meta
            name="description"
            content="News Jasoos - we have curated Hindi news in crime and Bollywood mainly written by Avneesh Chaudhary"
          />
          <meta
            name="keywords"
            content=" Breaking news,social media,bollywood news,movie review, hindi news, crime News, Bollywood Latest news in Hindi,मूवी रिव्यू, क्राइम न्यूज, बॉलीवुड, फिल्म,सिनेमा,स्पोर्ट्स,मर्डर, इकोनॉमिक्स, करेंट अफेयर्स,ब्रेकिंग न्यूज़, लैटेस्ट न्यूज, मुख्य समाचार"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="Hindi"></meta>
          <link rel="icon" href="/pro.ico" />
          <script
            async
            custom-element="amp-auto-ads"
            src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
          ></script>
        </Head>
      )}
      <div className="dark:bg-gray-800 sticky top-0 z-50">
        <amp-auto-ads
          type="adsense"
          data-ad-client="ca-pub-1621029292135466"
        ></amp-auto-ads>
        <aside>
          <SideNavbar />
        </aside>
      </div>

      <div className="border-1  grid grid-flow-row gap-8 dark:bg-gray-900 dark:border-gray-800 text-neutral-600 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  py-10 px-1">
        {results?.length > 0 &&
          results.map((e, id) => (
            <div
              key={id}
              className="shadow-2xl flex-column content-center grid-cols-2  p-0 rounded-lg shadow-lg bg-white dark:bg-gray-800 max-w-sm"
            >
              <div key={id} className="rounded-lg">
               
                  {console.log(e?.images[0].url,"GGGG")}
                  {e?.images[0]?.url && (
                    <Image
                      className="rounded-t-lg"
                      style={{ height: "25%", width: "100%" }}
                      height={"60%"}
                      width={"100%"}
                      layout="responsive"
                      src={e?.images[0]?.url}
                      alt={e.title}
                    />
                  )}
                
              </div>
              <div className="p-5">
                <Tag color="red" style={{ fontWeight: 900 }}>
                  अवनीश चौधरी
                </Tag>
                <Tag color="black" style={{ fontWeight: 700 }}>
                  {moment(((e?.published)).toString()).format(
                    "DD/MM/YY hh:mm A"
                  )}
                </Tag>

                <Link passHref href={`/posts/${e?.title?.replaceAll(" ","-")}##${e?.id}`}>
                  <h1 className="mb-2 text-m  font-bold tracking-tight text-gray-900 dark:text-white">
                    {e.title}
                  </h1>
                </Link>
                <p className="mb-3  black dark:text-white">
                  {e.title?.substring(0, 500)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1 mx-10 mb-10">
                <div>
                  <button
                    onClick={() =>
                      share(
                        e.title,
                        `/posts/${e.title}`,
                        e.title,
                        e?.images?.url
                      )
                    }
                    className="relative px-6 py-2 group"
                  >
                    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-cyan-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-cyan-700 group-hover:bg-cyan-700"></span>
                    <span className="relative text-cyan-700 group-hover:text-cyan-100">
                      <b>SHARE</b>
                    </span>
                  </button>
                </div>
                <div>
                  <Link
                    href={`/posts/${e?.title?.replaceAll(" ","-")}##${e?.id}`}
                    passHref
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  >
                    <button className="relative px-6 py-2 group">
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-indigo-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-white border-2 border-indigo-700 group-hover:bg-indigo-700"></span>
                      <span className="relative text-indigo-700 group-hover:text-indigo-100 ">
                        {" "}
                        <b>READ STORY</b>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default memo(NewsList);

// export async function getStaticProps() {

//   const getDAta = await Axios.get("http://localhost:3000/api/hello");

//   return {
//     props:{
//       results: getDAta.data.data
//     }
//   }
// }

