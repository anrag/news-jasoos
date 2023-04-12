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

const fetchCategory = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        org {
          count
          data {
            id
            name
          }
        }
      }
    `,
  });
  return data.org.data;
};

const endPoint =`https://newsjasoos.in`
const titleOfNews = (data) => data.split('##')[0]
export { fetchArticles, fetchCategory,endPoint,titleOfNews };
