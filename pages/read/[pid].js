import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SideNavbar from "../../components/SideNavbar";
import Home from "..";
import moment from "moment";
import { Button, Tag } from "antd";
import Head from "next/head";
const qdata = gql`
  query article($id: ID!) {
    article(query: { id: $id }) {
      data {
        title
        featureImage
        longArticle
        secondaryImage
        createdAt
      }
    }
  }
`;
const Post = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data } = useQuery(qdata, {
    variables: {
      id: pid,
    },
  });
  let detail = data?.article.data[0];
  return (
    <>
      <Head>
        <title>{detail?.title}</title>
        <meta name="description" content={detail?.title} />
      </Head>
      <div className="bg-white dark:bg-slate-800 flex flex-col">
        <div className="flex  sticky top-0 z-50">
          <div className="basis-1/2 p-5">
            <Button
              style={{ borderRadius: 10 }}
              type="primary"
              title="Back"
              href="/"
            >
              Back
            </Button>
          </div>
          <div>
            <SideNavbar />
          </div>
        </div>
        <div className="place-items-center">
          <div className="content-center text-black dark:text-slate-100">
            <h1 className="text-black dark:text-slate-100">{detail?.title}</h1>
          </div>

          <div>
            <img src={data?.article.data[0]?.featureImage} />
          </div>
          <div>
            <div>
              <div className="flex p-2">
                <Tag color="magenta">अवनीश चौधरी</Tag>
                <Tag color="magenta">
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
          <div>
            <img src={data?.article.data[0]?.secondaryImage} />
          </div>
        </div>
      </div>
      <div className="p-10 text-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-100">
        <p className="bigger-text">और पड़े</p>
      </div>
      <Home />
    </>
  );
};

export default Post;
