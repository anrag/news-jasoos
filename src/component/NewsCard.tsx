import React from "react";
import { ShareAltOutlined, ReadOutlined } from "@ant-design/icons";
import { Card, Tag } from "antd";
import { INews } from "../containers/News";
import { useNavigate } from "react-router-dom";
const NewsCard = (props: INews) => {
  const navigate = useNavigate();
  const readNews = () => {
    navigate(`/read/${props.heading}`, { state: props });
  };
  let { author, content, date, heading, detailContent, imgUrl, location } =
    props;
  return (
    <Card
      style={{ padding: "10px", height: "100px !importnat" }}
      cover={<img alt="example" src={imgUrl} />}
      actions={[
        <ShareAltOutlined key="edit" />,
        <ReadOutlined
          onClick={readNews}
          key={"ReadMore"}
          alt="Read More"
          about="react more"
        />,
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

      <div className="home-news-article hindi-font">{content}</div>
    </Card>
  );
};

export default NewsCard;
