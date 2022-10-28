import React from "react";
import { ShareAltOutlined, ReadOutlined } from "@ant-design/icons";
import { Card, Tag } from "antd";
import { INews } from "../containers/News";
import { useNavigate } from "react-router-dom";
const NewsCard = (props: INews) => {
  const navigate = useNavigate();
  const readNews = () => {
    window.scrollTo(0, 0);
    navigate(
      `/read/${
        props?.heading
          ? decodeURIComponent(props?.heading.replaceAll(" ", "-"))
          : ""
      }`,
      {
        state: props,
      }
    );
  };
  let { author, content, date, heading, imgUrl, shortContent } = props;
  const shareNews = () => {
    if (navigator.share) {
      navigator.share({
        title: heading,
        text: content,
        url: `/read/${props.heading}`,
      });
    }
  };

  return (
    <Card
      style={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          style={{ height: "35vh", aspectRatio: "initial" }}
          src={imgUrl}
        />
      }
      actions={[
        <div style={{ color: "black", fontWeight: 700 }}>
          <ShareAltOutlined color="black" onClick={shareNews} key="edit" />
          <br />
          Share
        </div>,
        <div style={{ color: "black", fontWeight: 700 }}>
          <ReadOutlined
            onClick={readNews}
            key={"ReadMore"}
            alt="Read More"
            about="react more"
          />
          <br />
          Read More
        </div>,
      ]}
    >
      <div className="home-news-header">
        <h2>{heading}</h2>
        {author && (
          <Tag color="error">
            Written by - <b>{author}</b>
          </Tag>
        )}
        {author && (
          <Tag color="success">
            <b>{date}</b>
          </Tag>
        )}
      </div>

      <div className="home-news-article hindi-font">{shortContent}</div>
    </Card>
  );
};

export default NewsCard;
