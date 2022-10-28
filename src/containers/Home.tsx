import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NewsCard from "../component/NewsCard";

const Home = () => {
  let [apiResponse, setApiResponse] = useState([]);
  useEffect(() => {
    fetchCall();
  }, []);
  const fetchCall = async () => {
    let response = await axios({
      method: "get",
      url: "https://dailycrimenews.in/readNews",
    });
    // console.log(response.data.news);
    setApiResponse(response.data.news);
  };
  return (
    <React.Fragment>
      {apiResponse?.length > 0 ? (
        apiResponse.reverse().map((e: any) => (
          <div style={{ height: "auto" }}>
            <NewsCard
              author={"Avneesh Chaudhary"}
              imgUrl={e?.imageurl}
              content={e.detail}
              heading={e.Heading}
              urlSlug={e.urlSlug}
              detailContent={e.detail}
              shortContent={e["short-detail"]}
              location={e?.location}
              date={moment(e.createdAt).format("Do MMM YY")}
            />
          </div>
        ))
      ) : (
        <h1>Loading</h1>
      )}
    </React.Fragment>
  );
};

export default Home;
