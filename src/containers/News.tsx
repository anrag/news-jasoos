import React from "react";

export interface INews {
  heading?: string;
  date?: string;
  author?: string;
  content?: string;
  imgUrl?: string;
  location?: string;
  detailContent?: string;
  shortContent?: string;
}
const NewsTemplate = (props: INews) => {
  let { heading, author, content, date, imgUrl, location } = props;
  return (
    <>
      <div className="home">
        <div className="home-image">
          <img src={imgUrl}></img>
        </div>
        <div className="home-news-header">
          <h2 style={{ wordWrap: "break-word" }}>{heading}</h2>
          <p>{date}</p>
          <p>{author}</p>
        </div>
        <div className="home-news-article">{content}</div>
      </div>
    </>
  );
};
export default NewsTemplate;
