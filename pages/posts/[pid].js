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



  let { pid } = router.query;
  useEffect(() => {
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
    getPostData();
  },[router?.asPath,props.results])


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
            type: "article",
            article: {
              publishedTime: detail?.publishedTime,
              modifiedTime: detail?.updatedTime,
              authors:
                detail?.author?.image.length > 0 ? detail?.author?.image : [],
            },
            title: props.results?.title,
            description: props.results?.images[0].title?.replaceAll("#", ""),
            locale: "hi",
            image: props.results?.images[0].url,
            images: [
              {
                url: props.results?.images[0].url,
                alt: props.results?.title,
                width: "500px",
                height: "500px",
              },
            ],
            siteName: `News Jasoos - ${props.results?.images[0].title?.replaceAll(
              "#",
              ""
            )}`,
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
          <div style={{cursor:"pointer"}}  className="grid h-screen place-items-center">
            <amp-auto-ads
              type="adsense"
              data-ad-client="ca-pub-1621029292135466"
            ></amp-auto-ads>
            <button
              type="button"
             
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
                <div></div>
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
                <div className=" bg-white dark:bg-slate-800 flex justify-around">
                  <button
                    onClick={() =>
                      share(
                        titleOfNews(detail.title),
                        `/posts/${detail.id}`,
                        detail.shortArticle,
                        detail.featureImage
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
                  <a
                    target="_blank"
                    href={`https://api.whatsapp.com/send?text={${endPoint}/posts/${detail.id}}`}
                  >
                    <button
                      onClick={() =>
                        share(
                          titleOfNews(detail.title),
                          `/posts/${detail.id}`,
                          detail.shortArticle,
                          detail.featureImage
                        )
                      }
                      className="relative px-6 py-2 group"
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-cyan-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                      <span className="absolute inset-0 w-full h-full bg-white border-2 border-cyan-700 group-hover:bg-cyan-700"></span>
                      <span className="relative text-cyan-700 group-hover:text-cyan-100">
                        
                        <div className="flex">
                         
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        </div>
                      </span>
                      WHATSAPP
                    </button>
                  </a>
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
    fallback: 'blocking',
  };
}

export default Post;
