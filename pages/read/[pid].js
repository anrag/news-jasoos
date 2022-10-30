import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Suspense, useState } from "react";
import { NextSeo } from "next-seo";
import SideNavbar from "../../components/SideNavbar";
import Image from "next/image";
import Home from "..";
import moment from "moment";
import { Button, Tag } from "antd";
import Head from "next/head";
import Link from "next/link";
const qdata = gql`
  query article($id: ID!) {
    article(query: { id: $id }) {
      data {
        id
        title
        featureImage
        shortArticle
        longArticle
        secondaryImage
        createdAt
      }
    }
  }
`;
const Post = () => {
  const router = useRouter();
  let { pid } = router.query;

  const { data } = useQuery(qdata, {
    variables: {
      id: pid,
    },
  });
  let detail = data?.article.data[0];
  return (
    <>
      {detail?.title && (
        <NextSeo
          title={detail?.title}
          description={detail?.shortArticle}
          openGraph={{
            url: `https://newsjasoos.in/read/${pid}`,
            title: detail?.title,
            description: detail?.shortArticle,
            locale: "hi",
            images: [
              {
                url: detail?.featureImage,
                alt: detail?.title,
              },
            ],
            siteName: `News Jasoos - ${detail?.title}`,
          }}
        />
      )}
      <Head>
        <title>News Jasoos - {detail?.title}</title>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1621029292135466"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        ></script>
      </Head>
      <Suspense fallback={<p>Loading feed...</p>}>
        {!detail ? (
          <div className="grid h-screen place-items-center">
            <amp-auto-ads
              type="adsense"
              data-ad-client="ca-pub-1621029292135466"
            ></amp-auto-ads>
            <button
              type="button"
              style={{
                fontSize: "30px",
                padding: "20px",
                borderRadius: "10px",
              }}
              className="text-white bg-indigo-500"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
              ></svg>
              ✋ कृपया प्रतीक्षा करें ✋...
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-slate-800 flex flex-col">
              <div className="flex  sticky top-0 z-50">
                <div className="basis-1/2 p-5">
                  <Link href={"/"} des passHref>
                    <Button
                      style={{ borderRadius: 10 }}
                      type="primary"
                      title="Back"
                      href="/"
                    >
                      Back
                    </Button>
                  </Link>
                </div>
                <div>
                  <SideNavbar />
                </div>
              </div>
              <div className="place-items-center">
                <div className="content-center text-black dark:text-slate-100">
                  <h1 className="text-black dark:text-slate-100">
                    {detail?.title}
                  </h1>
                </div>

                <div>
                  {data?.article.data[0]?.featureImage && (
                    <Image
                      className="rounded-t-lg"
                      style={{ height: 200, width: "100%" }}
                      height={80}
                      width={"100%"}
                      layout="responsive"
                      src={data?.article.data[0]?.featureImage}
                      alt={detail?.title}
                    />
                  )}
                </div>
                <div>
                  <div>
                    <div className="flex p-2">
                      <Tag color="gold">अवनीश चौधरी</Tag>
                      <Tag color="black">
                        {moment(
                          new Date(parseInt(detail?.createdAt)).toString()
                        ).format("DD/MM/YY hh:mm A")}
                      </Tag>
                    </div>
                  </div>
                  <div
                    className="desktop:m-100 laptop:m-100 article-text text-black dark:text-slate-100"
                    dangerouslySetInnerHTML={{ __html: detail?.longArticle }}
                  />
                </div>
                {/* <div>
                  {data?.article.data[0]?.secondaryImage && (
                    <Image
                      className="rounded-t-lg"
                      style={{ height: 200, width: "100%" }}
                      height={80}
                      width={"100%"}
                      layout="responsive"
                      priority
                      src={data?.article.data[0]?.secondaryImage}
                      alt={detail?.title}
                    />
                  )}
                </div> */}
              </div>
            </div>
            <div className="p-10 text-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-100">
              <p className="bigger-text">और पड़े</p>
            </div>
          </>
        )}
      </Suspense>
      <Suspense fallback={<p>Loading..</p>}>
        <Home />
      </Suspense>
    </>
  );
};

export default Post;
