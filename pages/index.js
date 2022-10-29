import SideNavbar from "../components/SideNavbar";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "./api/graphql-client";
import Image from "next/image";
import { Tag } from "antd";
import moment from "moment";
import Head from "next/head";
export default function Home() {
  const [newsArticle, setNewsArticle] = useState([]);
  useEffect(() => {
    fetchArticles();
  }, []);
  const fetchArticles = async () => {
    const { data } = await client.query({
      query: gql`
        query {
          article {
            count
            data {
              id
              title
              featureImage
              shortArticle
              createdAt
            }
          }
        }
      `,
    });
    setNewsArticle(data.article.data);
  };

  const share = (title, url, text) => {
    if (navigator.share) {
      navigator.share({
        title,
        url,
        text,
      });
    }
  };
  return (
    <>
      <Head>
        <title>Responsive Side-Navbar</title>
        <meta
          name="description"
          content="News Site about crime and bollywood news coverrage"
        />
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
      </Head>
      <div className="dark:bg-gray-800 sticky top-0 z-50">
        <aside>
          <SideNavbar />
        </aside>
      </div>

      <div className="grid grid-flow-row gap-8 dark:bg-gray-800 dark:border-gray-800 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {newsArticle?.map((e, id) => (
          <div
            key={id}
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <a href={`/read/${e.id}`}>
              {e?.featureImage && (
                <Image
                  className="rounded-t-lg"
                  style={{ height: 200, width: "100%" }}
                  height={100}
                  width={"100%"}
                  layout="responsive"
                  src={e.featureImage}
                  alt={e.title}
                />
              )}
            </a>
            <div className="p-5">
              <Tag color="magenta">अवनीश चौधरी</Tag>
              <Tag color="magenta">
                {moment(new Date(parseInt(e?.createdAt)).toString()).format(
                  "DD/MM/YY hh:mm A"
                )}
              </Tag>

              <a href={`/read/${e.id}`}>
                <h1 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                  {e.title}
                </h1>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-white">
                {e.shortArticle?.substring(0, 500)}
              </p>
              <div className="flex mt-4 space-x-3 md:mt-6 justify-around">
                <a
                  onClick={() => share(e.title, `read/${e.id}`, e.shortArticle)}
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Share
                </a>
                <a
                  href={`/read/${e.id}`}
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
