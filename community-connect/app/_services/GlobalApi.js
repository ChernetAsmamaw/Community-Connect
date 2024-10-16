import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://eu-west-2.cdn.hygraph.com/content/" +
  process.env.NEXT_PUBLIC_MATER_URL_KEY +
  "/master";

const getCategory = async () => {
  const query = gql`
    query MyQuery {
      categories {
        bgColor {
          hex
        }
        name
        id
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

export default { getCategory };
