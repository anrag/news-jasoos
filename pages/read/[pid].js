import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import SideNavbar from "../../components/SideNavbar";
import Home from "..";
import moment from "moment";
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
      <div className="sticky top-0 z-50">
        <aside>
          {" "}
          <SideNavbar />
        </aside>
      </div>
      <div className="place-items-center bg-white dark:bg-slate-800 flex flex-col">
        <div className="content-center text-slate-500 dark:text-slate-100">
          <h1>{detail?.title}</h1>
        </div>
        <div>
          <img src={data?.article.data[0]?.featureImage} />
        </div>
        <div>
          <div>
            <p className="ext-slate-500 dark:text-slate-100">
              {moment.unix(1667040910670).format("dd-mm-yy")}
            </p>
          </div>
          <div
            className="desktop:m-100 laptop:m-100 article-text text-slate-500 dark:text-slate-100"
            dangerouslySetInnerHTML={{ __html: detail?.longArticle }}
          />
        </div>
        <div>
          <img src={data?.article.data[0]?.secondaryImage} />
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
