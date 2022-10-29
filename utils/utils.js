import { gql } from "@apollo/client";
import client from "../pages/api/graphql-client";

const fetchArticles = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        article {
          count
          data {
            id
            title
            featureImage
            shortArticle
            createdAt
          }
        }
      }
    `,
  });
  return data.article.data;
};

export default fetchArticles;
