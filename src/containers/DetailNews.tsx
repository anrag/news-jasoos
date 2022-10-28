import { Divider, PageHeader, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./Home";

const NewsDetail = () => {
  const [ApiResponse, setApiResponse] = useState<any>({});
  const { state, pathname } = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    fetchCall();
  }, []);

  const fetchCall = async () => {
    let slug = pathname.split("/")[2];
    slug = slug.replaceAll("-", " ");
    let response = await axios({
      method: "get",
      url: "https://dailycrimenews.in/readNews",
    });
    let fetchedResponse: [] = response.data.news;
    let article = fetchedResponse.filter((e: any) => e?.urlSlug === slug);
    console.log(article[0]);
    setApiResponse(article[0]);
  };
  return (
    <React.Fragment>
      <PageHeader
        style={{
          position: "fixed",
          height: "70px",
          width: "100%",
          background: "#fff",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
        className="site-page-header"
        onBack={() => navigate("/")}
        title={"Back"}
        subTitle={
          <Tag color="red"> {state?.date || ApiResponse?.createdAt}</Tag>
        }
      />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{state?.heading}</title>
        <link rel="canonical" href={pathname} />
      </Helmet>
      <div className="detail-base">
        <div className="detail-page">
          <div className="detail-headline hindi-font">
            {state?.heading || ApiResponse?.Heading}
          </div>
        </div>

        <div className="detail-img">
          <img
            src={state?.imgUrl || ApiResponse?.imageurl}
            style={{ margin: "10px", width: "100%" }}
            alt={state?.heading || ApiResponse?.Heading}
          />
        </div>
        <div className="detail-meta">
          <meta about={state?.content || ApiResponse?.detail}></meta>
          <div>
            {state?.author && <Tag color="blue">{state?.author}</Tag>}
            {state?.date && <Tag color="blue">{state?.date}</Tag>}
            {state?.location && <Tag color="red">{state?.location}</Tag>}
          </div>
        </div>
        <td
          dangerouslySetInnerHTML={{
            __html: state?.detailContent || ApiResponse?.detail,
          }}
        />
        {/* <div className="detail-news hindi-font">{state?.detailContent}</div> */}
      </div>

      <Divider />
      <Home />
    </React.Fragment>
  );
};

export default NewsDetail;
