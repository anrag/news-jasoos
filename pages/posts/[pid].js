import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Suspense, useState } from "react";
import { NextSeo } from "next-seo";
import SideNavbar from "../../components/SideNavbar";
import Image from "next/image";
import Home from "..";
import moment from "moment";
import { Button, Divider, Tag } from "antd";
import Head from "next/head";
import Link from "next/link";
import { ShareAltOutlined } from "@ant-design/icons";
import { share } from "../../components/Share";
const qdata = gql`
  query article($slug: String!) {
    article(query: { slug: $slug }) {
      data {
        id
        title
        featureImage
        slug
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
      slug: pid,
    },
  });
  let detail = data?.article.data[0];
  return (
    <>
      {
        <NextSeo
          title={!detail?.title ? pid?.replaceAll("-", " ") : detail?.title}
          description={detail?.shortArticle}
          openGraph={{
            url: `https://newsjasoos.in/posts/${pid}`,
            title: !detail?.title ? pid?.replaceAll("-", " ") : detail?.title,
            description: pid?.replaceAll("-", " ") || detail?.shortArticle,
            locale: "hi",
            images: [
              {
                url:
                  `https://my-usa-cricket.s3.amazonaws.com/profilePictures/${pid}` ||
                  detail?.featureImage,
                alt: !detail?.title ? pid?.replaceAll("-", " ") : detail?.title,
              },
            ],
            siteName: `News Jasoos - ${
              !detail?.title ? pid?.replaceAll("-", " ") : detail?.title
            }`,
          }}
        />
      }
      <Head>
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
            <div className="bg-white dark:bg-slate-800 flex content-center flex-col">
              <div className="flex  sticky top-0 z-50">
                <div className="basis-1/2 p-5">
                  <Link href={"/"} des passHref>
                    <button className="relative px-6 py-2 group">
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-indigo-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-white border-2 border-indigo-700 group-hover:bg-indigo-700"></span>
                      <span className="relative text-indigo-700 group-hover:text-indigo-100 ">
                        {" "}
                        <b>BACK</b>
                      </span>
                    </button>
                  </Link>
                </div>
                <div>
                  <SideNavbar />
                </div>
              </div>
              <article className="content-center prose lg:prose-sm self-center">
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
                <div className="bg-white dark:bg-slate-800 flex">
                  <Button
                    size="large"
                    onClick={() =>
                      share(
                        detail.title,
                        `https://newsjasoos.in/posts/${detail.slug}`,
                        detail.shortArticle,
                        detail.featureImage
                      )
                    }
                    style={{ borderRadius: 10, fontSize: 18 }}
                    icon={<ShareAltOutlined />}
                    type="primary"
                    block
                  >
                    Share
                  </Button>
                </div>
              </article>
            </div>

            <div className="p-2 text-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-100">
              <Divider className="bg-white dark:bg-slate-800" />
              <p className="bigger-text">👇 और पड़े 👇</p>
            </div>
          </>
        )}
      </Suspense>
      <Suspense fallback={<p>Loading..</p>}>
        <Home base="posts" />
      </Suspense>
    </>
  );
};

export default Post;
