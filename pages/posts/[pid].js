import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Suspense, useEffect, useState } from "react";
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
import NewsList from "../NewsList";
import Axios  from "axios";
import { endPoint, titleOfNews } from "../../utils/utils";
const Post = (props) => {
  const router = useRouter();
  const [postData, setPostData] = useState(null);
  const getPostData = async () => {
    if(router?.asPath){
      // let getDAta = await Axios.get(`${endPoint}/api/postdata?articleId=${router.asPath.split("***")[1]}`);
      
      let getDAta = props.results;
       setPostData({
        id: getDAta.id,
        title: titleOfNews(getDAta.title),
        author:getDAta.author,
        publishedTime:getDAta.published,
        updatedTime:getDAta.updated,
        featureImage: getDAta  ? getDAta?.images[0].url : '',
        slug: getDAta.title,
        shortArticle: getDAta.title?.replaceAll("#",''),
        longArticle: getDAta.content,
        secondaryImage: getDAta.images[0].url,
        createdAt: getDAta.published,
      });
    }
  }

  let { pid } = router.query;
  useEffect(() => {
    getPostData();
  },[router.asPath])


  let detail = postData
  let siteTitle = detail?.title.replaceAll("-", " ")?.split("##")[0] ? detail?.title.replaceAll("-", " ")?.split("##")[0] : detail?.title.replaceAll("-", " ");

  return (
    <>
      {
        <NextSeo
          title={siteTitle}
          description={detail?.shortArticle}
          openGraph={{
            url: `https://newsjasoos.in/posts/${pid}`,
            type:'article',
            article :{
              publishedTime:detail?.publishedTime,
              modifiedTime:detail?.updatedTime,
              authors: detail?.author?.image.length > 0 ? detail?.author?.image: []
            }
            ,
            title: props.results?.title,
            description: props.results?.images[0].title?.replaceAll("#",''),
            locale: "hi",
            image: props.results?.images[0].url,
            images: [
              {
                url: props.results?.images[0].url,
                alt: props.results?.title,
                width:"500px",
                height:"500px"
              },
            ],
            siteName: `News Jasoos - ${props.results?.images[0].title?.replaceAll("#",'')}`,
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
           <SideNavbar />
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
                 
                </div>
              </div>
              <article className="rounded  content-center prose lg:prose-xl self-center shadow-2xl shadow-lg bg-white dark:bg-gray-900 p-1">
                <div className="content-center text-black dark:text-slate-100">
                  <h1 className="text-black dark:text-slate-100">
                    {titleOfNews(detail?.title)}
                  </h1>
                </div>

                <div></div>
                <div>
                  <div>
                    <div className="flex p-2">
                      <Tag color="gold">अवनीश चौधरी</Tag>
                      <Tag color="black">
                        {moment((detail?.createdAt).toString()).format(
                          "DD/MM/YY hh:mm A"
                        )}
                      </Tag>
                    </div>
                  </div>
                  <div
                    className="mx-auto sm:text-center  article-text !break-normal !text-white !dark:text-slate-100"
                    dangerouslySetInnerHTML={{
                      __html: detail?.longArticle.replaceAll(
                        "black",
                        "inherit"
                      ),
                    }}
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
                        titleOfNews(detail.title),
                        `/posts/${detail.id}`,
                        detail.shortArticle,
                        detail.featureImage
                      )
                    }
                    style={{ borderRadius: 10, fontSize: 18 }}
                    icon={<ShareAltOutlined />}
                    type="primary"
                    block
                  >
                    Share with friends
                  </Button>
                </div>
              </article>
            </div>

            <div className="p-2 text-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-100">
              <Divider className="bg-white dark:bg-slate-800" />
              <p className="bigger-text">👇 और पढ़े 👇</p>
            </div>
          </>
        )}
      </Suspense>
      <Suspense fallback={<p>Loading..</p>}>
        <NewsList />
      </Suspense>
    </>
  );
};


export async function getStaticProps({params} ) {
  const getDAta = await Axios.get(`${endPoint}/api/postdata?articleId=${params?.pid}`);
  return {
    props: {
      results: getDAta?.data?.data || {},
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {

  const getDAta = await Axios.get("https://www.newsjasoos.in/api/hello");
  let postMap = getDAta?.data?.data
  const postsPaths = postMap?.map((post) => {
    // console.log(post);
    return {
      params: { pid: `${post.id}`.toString(),id:post.id },
    };
  });
  return {
    paths: postsPaths,
    fallback: false,
  };
}

export default Post;
