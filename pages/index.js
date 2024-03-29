// export const config = { amp: true };
import SideNavbar from "../components/SideNavbar";
import { React, memo, useContext, useEffect, useState } from "react";
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
import Axios from "axios";
import { endPoint, titleOfNews } from "../utils/utils";
import { newsContext } from "../context/newslist.context";
import { NextSeo } from "next-seo";
const Home = ({ results }) => {
  // const data = useContext(newsContext);
  const [newsArticles, setNewsArticles] = useState({});
  useEffect(() => {
    setNewsArticles(results);
  }, []);
  const router = useRouter();
  return (
    <newsContext.Provider value={{ newsArticles, setNewsArticles }}>
      <NextSeo
        title={
          "News Jasoos - Breaking News in India, Latest Updates & Headlines,World News, Local Perspectives,Top Stories and News Analysis  In-Depth Reporting and Investigative Journalism "
        }
        description={`News Jasoos - your go-to source for breaking news, in-depth analysis, and expert opinion on the latest events and trends from around the world. Our mission is to provide you with accurate, reliable, and timely news coverage across a wide range of topics – from politics and business to entertainment and sports.
        Our team of experienced journalists and writers are committed to delivering high-quality news content that is informative, engaging, and thought-provoking. We strive to present a balanced and unbiased view of the news, and we're not afraid to tackle tough topics and hold those in power accountable.
        At our news site, you can expect to find breaking news alerts, exclusive interviews, feature stories, and in-depth reports on the issues that matter most to you. Whether you're looking for the latest updates on the global economy, the top stories of the day, or insightful analysis of the biggest events, we've got you covered.`}
        openGraph={{
          url: `https://newsjasoos.in`,
          title : 
            "News Jasoos - Breaking News in India, Latest Updates & Headlines,World News, Local Perspectives,Top Stories and News Analysis  In-Depth Reporting and Investigative Journalism "
          ,
          description:`News Jasoos - your go-to source for breaking news, in-depth analysis, and expert opinion on the latest events and trends from around the world. Our mission is to provide you with accurate, reliable, and timely news coverage across a wide range of topics – from politics and business to entertainment and sports.
          Our team of experienced journalists and writers are committed to delivering high-quality news content that is informative, engaging, and thought-provoking. We strive to present a balanced and unbiased view of the news, and we're not afraid to tackle tough topics and hold those in power accountable.
          At our news site, you can expect to find breaking news alerts, exclusive interviews, feature stories, and in-depth reports on the issues that matter most to you. Whether you're looking for the latest updates on the global economy, the top stories of the day, or insightful analysis of the biggest events, we've got you covered.`,
          locale: "hi",
          siteName: "News Jasoos - Breaking News in India, Latest Updates & Headlines,World News, Local Perspectives,Top Stories and News Analysis  In-Depth Reporting and Investigative Journalism "
        }}
      />
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
          <title>
            News Jasoos - The Front Page: News Jasoos's Daily News Digest
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
            content="news in hindi, Breaking news,social media,bollywood news,movie review, hindi news, crime News, Bollywood Latest news in Hindi,मूवी रिव्यू, क्राइम न्यूज, बॉलीवुड, फिल्म,सिनेमा,स्पोर्ट्स,मर्डर, इकोनॉमिक्स, करेंट अफेयर्स,ब्रेकिंग न्यूज़, लैटेस्ट न्यूज, मुख्य समाचार"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="Hindi"></meta>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest" />
          <script
            async
            custom-element="amp-auto-ads"
            src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
          ></script>
        </Head>
      )}
      <div  style={{cursor:"pointer"}}  className="dark:bg-gray-800 sticky top-0 z-50">
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
                {
                  <Image
                    className="rounded-t-lg"
                  
                    style={{ cursor:"pointer",height: "25%", width: "100%" }}
                    height={"60%"}
                    width={"100%"}
                    layout="responsive"
                    src={e?.images[0]?.url || ""}
                    alt={e.title}
                  />
                }
              </div>
              <div className="p-5">
                <Tag color="red" style={{ fontWeight: 900 }}>
                  अवनीश चौधरी
                </Tag>
                <Tag color="black" style={{ fontWeight: 700 }}>
                  {moment((e?.published).toString()).format("DD/MM/YY hh:mm A")}
                </Tag>
                <meta name="description" content={e?.title} />
                <Link
                  passHref
                  prefetch={true}
                  shallow={true}
                  href={`/posts/${e.id}`}
                >
                  <h1 style={{cursor:"pointer"}} className="mb-2 text-m  font-bold tracking-tight text-gray-900 dark:text-white">
                    {e.title?.split("##")[0]}
                  </h1>
                </Link>
                <p className="mb-3  black dark:text-white">
                  {e.title?.split("##")[1]?.substring(0, 500)
                    ? e.title?.split("##")[1]?.substring(0, 500)
                    : e.title?.substring(0, 500)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1 mx-10 mb-10">
                <div>
                  <button
                  style={{cursor:"pointer"}}
                    onClick={() =>
                      share(
                        e.title,
                        `/posts/${e.id}`,
                        e.title,
                        e?.images[0]?.url || ""
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
                <div style={{cursor:"pointer"}}>
                  <Link
                    href={`/posts/${e.id}`}
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
    </newsContext.Provider>
  );
};

export default memo(Home);

export async function getStaticProps() {
  const getDAta = await Axios.get(`${endPoint}/api/hello`);

  return {
    props: {
      results: getDAta?.data?.data || {},
    },
    revalidate: 60,
  };
}
