import SideNavbar from "../components/SideNavbar";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "./api/graphql-client";
import Image from "next/image";
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
    alert("hekko", navigator.share);
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
      {/* <Head>
        <title>Responsive Side-Navbar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pro.ico" />
      </Head> */}
      <div className="dark:bg-gray-800 sticky top-0 z-50">
        <aside>
          <SideNavbar />
        </aside>
      </div>

      <div className="grid grid-flow-row gap-8 dark:bg-gray-800 dark:border-gray-800 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {newsArticle.map((e, id) => (
          <div
            key={id}
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <Image
                className="rounded-t-lg"
                src={e.featureImage}
                alt={e.title}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {e.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {e.shortArticle}
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