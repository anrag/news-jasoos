import  Axios  from "axios";
import moment from "moment";
import React from "react";

const EXTERNAL_DATA_URL = "https://newsjasoos.in/posts";

function createSitemap(response) {
  console.log(response);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${
    response.length > 0 &&
    response
      .map(({ id, published, title }, index) => {
        return `
          <url>
              <loc>${`${EXTERNAL_DATA_URL}/${title.replaceAll(" ", "-")}##${id}`}</loc>
              <lastmod>${moment(published.toString()).format()}</lastmod>
              <changefreq>monthly</changefreq>
          </url>
      `;
      })
      .join("")
  }
  </urlset>`;
}

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    var myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,hi-IN;q=0.8,hi;q=0.7");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Origin", "https://newsjasoos.in");
    myHeaders.append("Referer", "https://newsjasoos.in/");
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Sec-Fetch-Site", "cross-site");

    myHeaders.append("accept", "*/*");
    myHeaders.append("content-type", "application/json");

    var raw = JSON.stringify({
      variables: {},
      query:
        "{\n  article {\n    count\n    data {\n      id\n   slug\n   title\n  createdAt\n        }\n     }\n}",
    });

   
    try {
      let dat = await Axios.get("https://newsjasoos.in/api/hello");
      dat = dat?.data?.data;
      console.log(dat)
      res?.setHeader("Content-Type", "application/xml");
      res?.write(createSitemap(dat));
      res?.end();
    } catch (error) {
      res?.setHeader("Content-Type", "application/xml");
      res?.write(createSitemap([]));
      res.end();
    }
  }
}

export default Sitemap;
